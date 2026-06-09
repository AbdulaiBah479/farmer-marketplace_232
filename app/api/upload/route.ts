import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  extractTextFromPDF,
  extractTextFromDocx,
  extractTextFromURL,
  processTextIntoChunks,
} from '@/lib/document-processor';
import { PLAN_LIMITS } from '@/types';

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get user profile to check plan limits
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, pdf_count')
    .eq('id', user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  const limits = PLAN_LIMITS[profile.plan];
  if (limits.max_pdfs !== null && profile.pdf_count >= limits.max_pdfs) {
    return NextResponse.json(
      { error: `You've reached your ${limits.max_pdfs} document limit. Upgrade to upload more.` },
      { status: 403 }
    );
  }

  const contentType = request.headers.get('content-type') || '';

  let extractedText = '';
  let title = '';
  let fileType: 'pdf' | 'docx' | 'url' = 'pdf';
  let fileSize: number | undefined;
  let storagePath: string | undefined;
  let docUrl: string | undefined;

  if (contentType.includes('application/json')) {
    // URL upload
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }
    fileType = 'url';
    docUrl = url;
    title = new URL(url).hostname + new URL(url).pathname;
    extractedText = await extractTextFromURL(url);
  } else {
    // File upload
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    title = file.name;
    fileSize = file.size;
    const buffer = Buffer.from(await file.arrayBuffer());

    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      fileType = 'pdf';
      extractedText = await extractTextFromPDF(buffer);
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.name.endsWith('.docx')
    ) {
      fileType = 'docx';
      extractedText = await extractTextFromDocx(buffer);
    } else {
      return NextResponse.json({ error: 'Unsupported file type. Use PDF, DOCX, or a URL.' }, { status: 400 });
    }

    // Upload file to Supabase Storage
    storagePath = `${user.id}/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(storagePath, buffer, { contentType: file.type });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      // Continue without storage if it fails
      storagePath = undefined;
    }
  }

  if (!extractedText || extractedText.trim().length < 50) {
    return NextResponse.json({ error: 'Could not extract text from document' }, { status: 400 });
  }

  // Create document record
  const { data: document, error: docError } = await supabase
    .from('documents')
    .insert({
      user_id: user.id,
      title,
      file_type: fileType,
      file_size: fileSize,
      url: docUrl,
      storage_path: storagePath,
      status: 'processing',
    })
    .select()
    .single();

  if (docError || !document) {
    return NextResponse.json({ error: 'Failed to create document record' }, { status: 500 });
  }

  try {
    // Process text into chunks with embeddings
    const chunks = await processTextIntoChunks(extractedText);

    // Insert chunks in batches
    const batchSize = 50;
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize).map(chunk => ({
        document_id: document.id,
        content: chunk.content,
        chunk_index: chunk.chunk_index,
        embedding: JSON.stringify(chunk.embedding),
      }));

      const { error: chunkError } = await supabase
        .from('document_chunks')
        .insert(batch);

      if (chunkError) {
        console.error('Chunk insert error:', chunkError);
      }
    }

    // Update document status
    await supabase
      .from('documents')
      .update({ status: 'ready', chunk_count: chunks.length })
      .eq('id', document.id);

    // Update user's pdf_count
    await supabase
      .from('profiles')
      .update({ pdf_count: profile.pdf_count + 1 })
      .eq('id', user.id);

    return NextResponse.json({ document: { ...document, status: 'ready', chunk_count: chunks.length } });
  } catch (error) {
    console.error('Processing error:', error);

    await supabase
      .from('documents')
      .update({ status: 'error', error_message: String(error) })
      .eq('id', document.id);

    return NextResponse.json(
      { error: 'Failed to process document. Please try again.' },
      { status: 500 }
    );
  }
}
