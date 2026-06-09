'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Globe, FileType, Trash2, MessageSquare, Loader2 } from 'lucide-react';
import { formatDate, formatFileSize } from '@/lib/utils';
import type { Document } from '@/types';

interface DocumentCardProps {
  document: Document;
  onDelete: (id: string) => void;
}

export function DocumentCard({ document, onDelete }: DocumentCardProps) {
  const Icon = document.file_type === 'url' ? Globe :
    document.file_type === 'docx' ? FileType : FileText;

  return (
    <Card className="group">
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            document.file_type === 'pdf' ? 'bg-red-50' :
            document.file_type === 'docx' ? 'bg-blue-50' : 'bg-purple-50'
          }`}>
            <Icon className={`h-5 w-5 ${
              document.file_type === 'pdf' ? 'text-red-500' :
              document.file_type === 'docx' ? 'text-blue-500' : 'text-purple-500'
            }`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-gray-900 truncate text-sm leading-5">
                {document.title}
              </h3>
              <div className="flex items-center gap-1 flex-shrink-0">
                {document.status === 'processing' && (
                  <Badge variant="warning">
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    Processing
                  </Badge>
                )}
                {document.status === 'ready' && <Badge variant="success">Ready</Badge>}
                {document.status === 'error' && <Badge variant="error">Error</Badge>}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
              <span className="uppercase font-medium">{document.file_type}</span>
              {document.file_size && <span>{formatFileSize(document.file_size)}</span>}
              {document.chunk_count && <span>{document.chunk_count} chunks</span>}
              <span>{formatDate(document.created_at)}</span>
            </div>
          </div>
        </div>

        {document.status === 'error' && document.error_message && (
          <p className="mt-3 text-xs text-red-500 bg-red-50 rounded-md px-3 py-2">
            {document.error_message}
          </p>
        )}

        <div className="flex items-center gap-2 mt-4">
          {document.status === 'ready' && (
            <Link href={`/documents/${document.id}`} className="flex-1">
              <Button variant="primary" size="sm" className="w-full">
                <MessageSquare className="h-4 w-4" />
                Chat with doc
              </Button>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(document.id)}
            className="text-gray-400 hover:text-red-500 hover:bg-red-50 flex-shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
