import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DocChat AI — Chat with any document',
  description: 'Upload any PDF, Word doc, or URL and chat with it using AI. Get instant summaries, answers, and data extraction.',
  keywords: 'PDF chat, AI document reader, chat with PDF, document AI, PDF summary',
  openGraph: {
    title: 'DocChat AI — Chat with any document',
    description: 'Get instant answers from any document with AI',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
