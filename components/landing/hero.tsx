import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Globe, FileType } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-full text-sm text-indigo-700 font-medium mb-8">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
          Powered by Google Gemini AI
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
          Chat with any
          <span className="text-indigo-600"> document</span>
          <br />in seconds
        </h1>

        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload a PDF, Word doc, or paste any URL. Ask questions, get summaries,
          and extract insights instantly with AI.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/signup">
            <Button size="xl" className="w-full sm:w-auto">
              Start for free
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="secondary" size="xl" className="w-full sm:w-auto">
              View pricing
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-indigo-500" />
            <span>PDF</span>
          </div>
          <div className="flex items-center gap-2">
            <FileType className="h-4 w-4 text-indigo-500" />
            <span>Word Docs</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-indigo-500" />
            <span>Any URL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
