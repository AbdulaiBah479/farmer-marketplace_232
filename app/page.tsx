import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { PricingSection } from '@/components/landing/pricing-section';
import { Testimonials } from '@/components/landing/testimonials';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <PricingSection />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-indigo-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to chat with your documents?
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Join thousands of professionals who use DocChat AI daily. Start free today.
          </p>
          <Link href="/signup">
            <Button size="xl" variant="secondary">
              Get started for free
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-white">
            <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center">
              <FileText className="h-3 w-3 text-white" />
            </div>
            DocChat AI
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign in</Link>
            <Link href="/signup" className="hover:text-white transition-colors">Sign up</Link>
          </div>
          <p className="text-sm">© 2024 DocChat AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
