import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { summarizeDocument } from '@/lib/gemini';

export const maxDuration = 120;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Verify document ownership
  const { data: document } = await supabase
    .from('documents')
    .select('id, status')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (!document || document.status !== 'ready') {
    return NextResponse.json({ error: 'Document not found or not ready' }, { status: 404 });
  }

  // Get document chunks for summarization
  const { data: chunks } = await supabase
    .from('document_chunks')
    .select('content, chunk_index')
    .eq('document_id', id)
    .order('chunk_index')
    .limit(50);

  if (!chunks || chunks.length === 0) {
    return NextResponse.json({ error: 'No content found in document' }, { status: 404 });
  }

  const fullText = chunks.map(c => c.content).join('\n\n');
  const summary = await summarizeDocument(fullText);

  return NextResponse.json({ summary });
}
