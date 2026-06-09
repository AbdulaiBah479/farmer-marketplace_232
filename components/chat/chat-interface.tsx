'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Send, Sparkles, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Message, SourceChunk } from '@/types';

interface ChatInterfaceProps {
  documentId: string;
  documentTitle: string;
  initialConversationId?: string;
}

const SUGGESTED_QUESTIONS = [
  'Summarize this document',
  'What are the key findings?',
  'What are the main risks or concerns?',
  'Extract the key dates and deadlines',
];

export function ChatInterface({ documentId, documentTitle, initialConversationId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<(Message & { sources?: SourceChunk[] })[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversationId, setConversationId] = useState(initialConversationId);
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (question: string) => {
    if (!question.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      conversation_id: conversationId || '',
      role: 'user',
      content: question,
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, documentId, conversationId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get answer');

      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        conversation_id: data.conversationId,
        role: 'assistant',
        content: data.answer,
        sources: data.sources,
        created_at: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get answer');
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="h-7 w-7 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 text-lg mb-2">
              Chat with "{documentTitle}"
            </h3>
            <p className="text-gray-500 text-sm mb-8">
              Ask anything about this document. Get accurate answers with source citations.
            </p>
            <div className="w-full space-y-2">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">
                Try asking
              </p>
              {SUGGESTED_QUESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="w-full text-left px-4 py-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 text-sm text-gray-700 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-500">DocChat AI</span>
                    </div>
                  )}

                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-50 text-gray-900 border border-gray-100'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-p:my-2">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    )}
                  </div>

                  {/* Sources */}
                  {message.role === 'assistant' && message.sources && message.sources.length > 0 && (
                    <div className="mt-2">
                      <button
                        onClick={() => setExpandedSources(prev => ({ ...prev, [message.id]: !prev[message.id] }))}
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <FileText className="h-3 w-3" />
                        {message.sources.length} source{message.sources.length > 1 ? 's' : ''}
                        {expandedSources[message.id] ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </button>
                      {expandedSources[message.id] && (
                        <div className="mt-2 space-y-2">
                          {message.sources.map((source, i) => (
                            <div
                              key={i}
                              className="text-xs bg-white border border-gray-100 rounded-lg p-3 text-gray-600"
                            >
                              <div className="font-medium text-gray-400 mb-1">
                                Chunk {source.chunk_index + 1} · {(source.similarity * 100).toFixed(0)}% match
                              </div>
                              <p className="leading-relaxed line-clamp-3">{source.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Spinner size="sm" />
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-center">
                <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600 max-w-md">
                  {error}
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3 items-end bg-white border border-gray-200 rounded-2xl p-3 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about this document..."
              rows={1}
              className="flex-1 resize-none text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent max-h-32"
              style={{ minHeight: '24px' }}
            />
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              size="icon"
              className="flex-shrink-0 h-8 w-8"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
