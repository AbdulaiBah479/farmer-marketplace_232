"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, CheckCircle, XCircle, Loader2, Trash2, BookOpen } from "lucide-react";
import type { Tenant, KnowledgeDocument } from "@/types";

export default function KnowledgeBase({ tenant, initialDocuments }: { tenant: Tenant; initialDocuments: KnowledgeDocument[] }) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      setUploading(true); setUploadMsg(`Uploading ${file.name}…`);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name.replace(/\.[^.]+$/, ""));
      try {
        const res = await fetch("/api/knowledge/upload", { method: "POST", body: formData });
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        const newDoc: KnowledgeDocument = { id: data.documentId, tenant_id: tenant.id, title: file.name.replace(/\.[^.]+$/, ""), file_url: null, file_type: file.type, content: null, status: "processing", chunk_count: 0, uploaded_by: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        setDocuments((prev) => [newDoc, ...prev]);
        const interval = setInterval(async () => {
          const r = await fetch(`/api/knowledge/${data.documentId}/status`);
          if (!r.ok) return;
          const d = await r.json();
          if (d.status === "ready" || d.status === "error") {
            clearInterval(interval);
            setDocuments((prev) => prev.map((doc) => doc.id === data.documentId ? { ...doc, status: d.status, chunk_count: d.chunkCount ?? 0 } : doc));
          }
        }, 2000);
      } catch { setUploadMsg("Upload failed."); setTimeout(() => setUploadMsg(null), 3000); }
      finally { setUploading(false); setTimeout(() => setUploadMsg(null), 1000); }
    }
  }, [tenant.id]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { "application/pdf": [".pdf"], "text/plain": [".txt"], "text/markdown": [".md"] }, maxSize: 10 * 1024 * 1024 });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div><h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1><p className="text-gray-500 mt-1">Upload company documents so your AI agents can reference them when answering questions.</p></div>
      <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}>
        <input {...getInputProps()} />
        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4"><Upload className="w-6 h-6 text-blue-600" /></div>
        <div className="font-semibold text-gray-900 mb-1">{isDragActive ? "Drop files here" : "Upload company documents"}</div>
        <div className="text-sm text-gray-500">Drag & drop or click. PDF, TXT, MD up to 10MB.</div>
        {uploadMsg && <div className="mt-4 flex items-center justify-center gap-2 text-sm text-blue-600"><Loader2 className="w-4 h-4 animate-spin" />{uploadMsg}</div>}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{label:"Documents",val:documents.length},{label:"Ready",val:documents.filter(d=>d.status==="ready").length},{label:"Knowledge chunks",val:documents.reduce((a,d)=>a+d.chunk_count,0)}].map(s=>(<div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center"><div className="text-2xl font-bold text-gray-900">{s.val}</div><div className="text-sm text-gray-500">{s.label}</div></div>))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-semibold text-gray-900">Documents</h2></div>
        {documents.length === 0 ? (<div className="py-16 text-center"><BookOpen className="w-10 h-10 text-gray-200 mx-auto mb-3" /><div className="text-gray-400 text-sm">No documents uploaded yet</div></div>) : (
          <ul className="divide-y divide-gray-100">
            {documents.map((doc) => (
              <li key={doc.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0"><FileText className="w-5 h-5 text-gray-500" /></div>
                <div className="flex-1 min-w-0"><div className="font-medium text-gray-900 truncate">{doc.title}</div><div className="text-sm text-gray-400 mt-0.5">{doc.file_type ?? "Document"} · {doc.chunk_count} chunks · {new Date(doc.created_at).toLocaleDateString()}</div></div>
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${doc.status==="ready"?"bg-green-50 text-green-700":doc.status==="error"?"bg-red-50 text-red-700":"bg-blue-50 text-blue-700"}`}>
                  {doc.status==="ready"?<CheckCircle className="w-3.5 h-3.5" />:doc.status==="error"?<XCircle className="w-3.5 h-3.5" />:<Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {doc.status==="ready"?"Ready":doc.status==="error"?"Error":"Processing"}
                </span>
                <button onClick={async()=>{await fetch(`/api/knowledge/${doc.id}`,{method:"DELETE"});setDocuments(p=>p.filter(d=>d.id!==doc.id));}} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
