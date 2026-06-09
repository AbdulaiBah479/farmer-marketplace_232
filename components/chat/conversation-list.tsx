'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface Conversation {
  id: string;
  title?: string;
  created_at: string;
}

interface ConversationListProps {
  documentId: string;
  activeId?: string;
  onSelect: (id: string) => void;
  onNew: () => void;
}

export function ConversationList({ documentId, activeId, onSelect, onNew }: ConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/documents/${documentId}/conversations`)
      .then(r => r.json())
      .then(data => setConversations(data.conversations || []))
      .finally(() => setLoading(false));
  }, [documentId]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-50">
        <button
          onClick={onNew}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg border border-dashed border-gray-200 text-sm text-gray-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
        >
          <Plus className="h-4 w-4" />
          New conversation
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {loading ? (
          <div className="text-center py-8 text-sm text-gray-400">Loading...</div>
        ) : conversations.length === 0 ? (
          <div className="text-center py-8 text-sm text-gray-400">
            No conversations yet
          </div>
        ) : (
          conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={cn(
                'w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all',
                activeId === conv.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate font-medium">
                  {conv.title || 'Conversation'}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5 ml-5.5">
                {formatDate(conv.created_at)}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
