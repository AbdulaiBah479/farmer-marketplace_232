import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateEmbedding, chatWithDocument } from '@/lib/gemini';
import { PLAN_LIMITS } from '@/types';

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { question, documentId, conversationId } = await request.json();

  if (!question || !documentId) {
    return NextResponse.json({ error: 'Question and documentId are required' }, { status: 400 });
  }

  // Check plan limits
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, question_count')
    .eq('id', user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  const limits = PLAN_LIMITS[profile.plan];
  if (limits.max_questions !== null && profile.question_count >= limits.max_questions) {
    return NextResponse.json(
      { error: `You've reached your ${limits.max_questions} question limit. Upgrade for unlimited questions.` },
      { status: 403 }
    );
  }

  // Verify document belongs to user
  const { data: document } = await supabase
    .from('documents')
    .select('id, status')
    .eq('id', documentId)
    .eq('user_id', user.id)
    .single();

  if (!document) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  }

  if (document.status !== 'ready') {
    return NextResponse.json({ error: 'Document is still processing' }, { status: 400 });
  }

  // Get or create conversation
  let activeConversationId = conversationId;
  if (!activeConversationId) {
    const { data: conv, error: convError } = await supabase
      .from('conversations')
      .insert({
        document_id: documentId,
        user_id: user.id,
        title: question.slice(0, 60),
      })
      .select('id')
      .single();

    if (convError || !conv) {
      return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
    }
    activeConversationId = conv.id;
  }

  // Get conversation history (last 10 messages)
  const { data: history } = await supabase
    .from('messages')
    .select('role, content')
    .eq('conversation_id', activeConversationId)
    .order('created_at', { ascending: true })
    .limit(10);

  // Generate embedding for the question
  const queryEmbedding = await generateEmbedding(question);

  // Semantic search for relevant chunks
  const { data: relevantChunks } = await supabase.rpc('match_document_chunks', {
    query_embedding: queryEmbedding,
    match_document_id: documentId,
    match_count: 5,
    match_threshold: 0.3,
  });

  if (!relevantChunks || relevantChunks.length === 0) {
    return NextResponse.json({ error: 'No relevant content found in document' }, { status: 404 });
  }

  // Format history for Gemini
  const geminiHistory = (history || []).map(msg => ({
    role: msg.role === 'user' ? 'user' as const : 'model' as const,
    parts: [{ text: msg.content }],
  }));

  // Get AI answer
  const answer = await chatWithDocument(question, relevantChunks, geminiHistory);

  // Save messages
  await supabase.from('messages').insert([
    {
      conversation_id: activeConversationId,
      role: 'user',
      content: question,
    },
    {
      conversation_id: activeConversationId,
      role: 'assistant',
      content: answer,
      sources: relevantChunks,
    },
  ]);

  // Increment question count
  await supabase
    .from('profiles')
    .update({ question_count: profile.question_count + 1 })
    .eq('id', user.id);

  return NextResponse.json({
    answer,
    conversationId: activeConversationId,
    sources: relevantChunks,
  });
}
