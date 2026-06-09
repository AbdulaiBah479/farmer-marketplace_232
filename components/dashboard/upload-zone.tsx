'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Upload, FileText, Globe, X, FileType } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Document } from '@/types';

interface UploadZoneProps {
  onUploadComplete: (document: Document) => void;
}

export function UploadZone({ onUploadComplete }: UploadZoneProps) {
  const [mode, setMode] = useState<'file' | 'url'>('file');
  const [url, setUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState('');

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError('');
    setProgress('Extracting text...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      setProgress('Generating embeddings...');
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onUploadComplete(data.document);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      setProgress('');
    }
  };

  const uploadUrl = async () => {
    if (!url.trim()) return;
    setUploading(true);
    setError('');
    setProgress('Fetching page content...');

    try {
      setProgress('Generating embeddings...');
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onUploadComplete(data.document);
      setUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      setProgress('');
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        uploadFile(acceptedFiles[0]);
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    multiple: false,
    disabled: uploading,
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode('file')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
            mode === 'file'
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <FileText className="h-4 w-4" />
          Upload file
        </button>
        <button
          onClick={() => setMode('url')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
            mode === 'url'
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <Globe className="h-4 w-4" />
          Paste URL
        </button>
      </div>

      {mode === 'file' ? (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all',
            isDragActive
              ? 'border-indigo-400 bg-indigo-50'
              : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50',
            uploading && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Spinner size="lg" />
              <p className="text-sm text-gray-500">{progress}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">
                  {isDragActive ? 'Drop your file here' : 'Drag & drop or click to upload'}
                </p>
                <p className="text-sm text-gray-500">PDF or DOCX up to 50MB</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><FileText className="h-3 w-3" />PDF</span>
                <span className="flex items-center gap-1"><FileType className="h-3 w-3" />DOCX</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            placeholder="https://example.com/article"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && uploadUrl()}
            disabled={uploading}
            icon={<Globe className="h-4 w-4" />}
            className="flex-1"
          />
          <Button onClick={uploadUrl} loading={uploading} disabled={!url.trim()}>
            Import
          </Button>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-lg">
          <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}
