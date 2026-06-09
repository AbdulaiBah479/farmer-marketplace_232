'use client';

import { useState, useEffect, useCallback } from 'react';
import { UploadZone } from '@/components/dashboard/upload-zone';
import { DocumentCard } from '@/components/dashboard/document-card';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/client';
import { FileText, Zap, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import type { Document, User, PLAN_LIMITS } from '@/types';
import { PLAN_LIMITS as planLimits } from '@/types';

export default function DashboardPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchData = useCallback(async () => {
    const [docsRes, { data: { user } }] = await Promise.all([
      fetch('/api/documents'),
      supabase.auth.getUser(),
    ]);

    const docsData = await docsRes.json();
    setDocuments(docsData.documents || []);

    if (user) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(profileData);
    }

    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this document? This will also delete all its chats.')) return;

    await fetch(`/api/documents?id=${id}`, { method: 'DELETE' });
    setDocuments(prev => prev.filter(d => d.id !== id));
    if (profile) {
      setProfile(prev => prev ? { ...prev, pdf_count: Math.max(0, prev.pdf_count - 1) } : null);
    }
  };

  const limits = profile ? planLimits[profile.plan] : planLimits.free;
  const pdfUsage = profile?.pdf_count || 0;
  const questionUsage = profile?.question_count || 0;

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
          <p className="text-gray-500 mt-1">Upload documents and chat with them using AI</p>
        </div>
        {profile && (
          <div className="flex items-center gap-3">
            <Badge variant={profile.plan === 'free' ? 'outline' : 'default'} className="capitalize">
              {profile.plan} plan
            </Badge>
            {profile.plan === 'free' && (
              <Link
                href="/pricing"
                className="flex items-center gap-1.5 text-sm text-indigo-600 font-medium hover:underline"
              >
                <Zap className="h-3.5 w-3.5" />
                Upgrade
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Usage stats */}
      {profile && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Documents</span>
              <FileText className="h-4 w-4 text-gray-300" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {pdfUsage}
              <span className="text-sm font-normal text-gray-400 ml-1">
                / {limits.max_pdfs ?? '∞'}
              </span>
            </div>
            {limits.max_pdfs !== null && (
              <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all"
                  style={{ width: `${Math.min((pdfUsage / limits.max_pdfs) * 100, 100)}%` }}
                />
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Questions asked</span>
              <HelpCircle className="h-4 w-4 text-gray-300" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {questionUsage}
              <span className="text-sm font-normal text-gray-400 ml-1">
                / {limits.max_questions ?? '∞'}
              </span>
            </div>
            {limits.max_questions !== null && (
              <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all"
                  style={{ width: `${Math.min((questionUsage / limits.max_questions) * 100, 100)}%` }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upload zone */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-4">Upload a document</h2>
        <UploadZone
          onUploadComplete={(doc) => {
            setDocuments(prev => [doc, ...prev]);
            if (profile) {
              setProfile(prev => prev ? { ...prev, pdf_count: prev.pdf_count + 1 } : null);
            }
          }}
        />
      </div>

      {/* Documents grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : documents.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No documents yet</p>
          <p className="text-sm mt-1">Upload your first document above to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map(doc => (
            <DocumentCard key={doc.id} document={doc} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
