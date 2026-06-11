import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AI COO - Your AI Chief Operating Officer',
    template: '%s | AI COO',
  },
  description: 'The world\'s most powerful AI Business Operating System for entrepreneurs, freelancers, agencies, and small businesses. Automate operations, generate leads, manage projects, and grow revenue with AI.',
  keywords: ['AI business software', 'AI COO', 'business automation', 'CRM', 'project management', 'AI assistant'],
  authors: [{ name: 'AI COO Team' }],
  creator: 'AI COO',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'AI COO - Your AI Chief Operating Officer',
    description: 'Automate your entire business with AI. Lead generation, CRM, proposals, contracts, social media, and more.',
    siteName: 'AI COO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI COO - Your AI Chief Operating Officer',
    description: 'Automate your entire business with AI.',
    creator: '@aicoo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0a1e' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
