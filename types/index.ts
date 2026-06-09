export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  plan: 'free' | 'pro' | 'team';
  pdf_count: number;
  question_count: number;
  created_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  title: string;
  file_type: 'pdf' | 'docx' | 'url';
  file_size?: number;
  page_count?: number;
  url?: string;
  storage_path?: string;
  status: 'processing' | 'ready' | 'error';
  error_message?: string;
  created_at: string;
  updated_at: string;
  chunk_count?: number;
}

export interface DocumentChunk {
  id: string;
  document_id: string;
  content: string;
  chunk_index: number;
  embedding?: number[];
  metadata?: Record<string, unknown>;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: SourceChunk[];
  created_at: string;
}

export interface Conversation {
  id: string;
  document_id: string;
  user_id: string;
  title?: string;
  created_at: string;
  messages?: Message[];
}

export interface SourceChunk {
  content: string;
  chunk_index: number;
  similarity: number;
}

export interface PlanLimits {
  max_pdfs: number | null;
  max_questions: number | null;
  team_sharing: boolean;
}

export const PLAN_LIMITS: Record<string, PlanLimits> = {
  free: { max_pdfs: 3, max_questions: 50, team_sharing: false },
  pro: { max_pdfs: 50, max_questions: null, team_sharing: false },
  team: { max_pdfs: null, max_questions: null, team_sharing: true },
};
