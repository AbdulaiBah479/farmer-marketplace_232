'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ChatInterface } from '@/components/chat/chat-interface';
import { ConversationList } from '@/components/chat/conversation-list';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ArrowLeft, Sparkles, FileText } from 'lucide-react';
import Link from 'next/link';
import type { Document } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DocumentChatPage({ params }: PageProps) {
  const { id } = use(params);
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeConversationId, setActiveConversationId] = useState<string | undefined>();
  const [chatKey, setChatKey] = useState(0);
  const [summarizing, setSummarizing] = useState(false);
  const [summary, setSummary] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/documents')
      .then(r => r.json())
      .then(data => {
        const doc = (data.documents || []).find((d: Document) => d.id === id);
        if (!doc) {
          router.push('/dashboard');
        } else {
          setDocument(doc);
        }
        setLoading(false);
      });
  }, [id, router]);

  const handleSummarize = async () => {
    setSummarizing(true);
    const res = await fetch(`/api/documents/${id}/summarize`, { method: 'POST' });
    const data = await res.json();
    setSummary(data.summary || '');
    setSummarizing(false);
  };

  const handleNewConversation = () => {
    setActiveConversationId(undefined);
    setChatKey(k => k + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!document) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left sidebar - conversations */}
      <div className="w-64 border-r border-gray-100 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-50">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-3 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <FileText className="h-4 w-4 text-red-500" />
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-900 leading-tight line-clamp-2">
                {document.title}
              </h3>
              <span className="text-xs text-gray-400 uppercase">{document.file_type}</span>
            </div>
          </div>
        </div>

        <div className="p-3 border-b border-gray-50">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleSummarize}
            loading={summarizing}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Summarize
          </Button>
        </div>

        <ConversationList
          documentId={id}
          activeId={activeConversationId}
          onSelect={(convId) => {
            setActiveConversationId(convId);
            setChatKey(k => k + 1);
          }}
          onNew={handleNewConversation}
        />
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {summary ? (
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Document Summary</h2>
                <Button variant="ghost" size="sm" onClick={() => setSummary('')}>
                  Back to chat
                </Button>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-6 prose prose-sm max-w-none">
                {summary}
              </div>
            </div>
          </div>
        ) : (
          <ChatInterface
            key={chatKey}
            documentId={id}
            documentTitle={document.title}
            initialConversationId={activeConversationId}
          />
        )}
      </div>
    </div>
  );
}
