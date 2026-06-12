import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient, supabaseAdmin } from "@/lib/db/client";
import { getUserById, createKnowledgeDocument, saveKnowledgeChunks } from "@/lib/db/queries";
import { getEmbedding, chunkText } from "@/lib/vector/embeddings";
import pdf from "pdf-parse";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const dbUser = await getUserById(user.id);
    if (!dbUser?.tenant_id) return NextResponse.json({ error: "No tenant" }, { status: 403 });

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string) || file?.name || "Untitled";
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    let content = "";
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      const pdfData = await pdf(buffer);
      content = pdfData.text;
    } else {
      content = new TextDecoder().decode(buffer);
    }
    if (!content.trim()) return NextResponse.json({ error: "Could not extract text" }, { status: 400 });

    const storagePath = `${dbUser.tenant_id}/${Date.now()}-${file.name}`;
    await supabaseAdmin.storage.from("knowledge").upload(storagePath, buffer, { contentType: file.type, upsert: false });
    const { data: urlData } = supabaseAdmin.storage.from("knowledge").getPublicUrl(storagePath);

    const doc = await createKnowledgeDocument({ tenant_id: dbUser.tenant_id, title, file_url: urlData.publicUrl, file_type: file.type, content, status: "processing", chunk_count: 0, uploaded_by: user.id });

    processDocument(doc.id, dbUser.tenant_id, content).catch(console.error);
    return NextResponse.json({ documentId: doc.id, status: "processing" }, { status: 201 });
  } catch (err) {
    console.error("[knowledge/upload] Error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

async function processDocument(docId: string, tenantId: string, content: string) {
  try {
    const chunks = chunkText(content, 400, 50);
    const embeddedChunks = await Promise.all(chunks.map(async (chunk, index) => ({ document_id: docId, tenant_id: tenantId, content: chunk, chunk_index: index, embedding: await getEmbedding(chunk), metadata: { chunk_index: index, total_chunks: chunks.length } })));
    await saveKnowledgeChunks(embeddedChunks);
    await supabaseAdmin.from("knowledge_documents").update({ status: "ready", chunk_count: chunks.length }).eq("id", docId);
  } catch (err) {
    console.error("[processDocument] Failed:", err);
    await supabaseAdmin.from("knowledge_documents").update({ status: "error" }).eq("id", docId);
  }
}
