import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: documents, error } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }

  return NextResponse.json({ documents });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const documentId = searchParams.get('id');

  if (!documentId) {
    return NextResponse.json({ error: 'Document ID required' }, { status: 400 });
  }

  // Verify ownership and get storage path
  const { data: document } = await supabase
    .from('documents')
    .select('storage_path')
    .eq('id', documentId)
    .eq('user_id', user.id)
    .single();

  if (!document) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  }

  // Delete from storage if exists
  if (document.storage_path) {
    await supabase.storage.from('documents').remove([document.storage_path]);
  }

  // Delete document (cascades to chunks and conversations)
  const { error: deleteError } = await supabase
    .from('documents')
    .delete()
    .eq('id', documentId)
    .eq('user_id', user.id);

  if (deleteError) {
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }

  // Decrement pdf_count
  const { data: profile } = await supabase
    .from('profiles')
    .select('pdf_count')
    .eq('id', user.id)
    .single();

  if (profile && profile.pdf_count > 0) {
    await supabase
      .from('profiles')
      .update({ pdf_count: profile.pdf_count - 1 })
      .eq('id', user.id);
  }

  return NextResponse.json({ success: true });
}
