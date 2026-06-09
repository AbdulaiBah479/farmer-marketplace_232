import { Suspense } from 'react';
import { Navbar } from '@/components/landing/navbar';
import { PricingSection } from '@/components/landing/pricing-section';
import { PricingUpgradeHandler } from '@/components/landing/pricing-upgrade-handler';

export const metadata = {
  title: 'Pricing — DocChat AI',
  description: 'Simple, transparent pricing for DocChat AI. Start free, upgrade when you need more.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24">
        <Suspense fallback={null}>
          <PricingUpgradeHandler />
        </Suspense>
        <PricingSection />

        {/* FAQ */}
        <section className="py-16 px-4 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently asked questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'What file types are supported?',
                a: 'PDF and Word (.docx) documents are fully supported. You can also paste any public URL to import web content.',
              },
              {
                q: 'How accurate are the answers?',
                a: 'Answers are grounded directly in your document using semantic search. The AI only uses content from your document, not general knowledge, so accuracy is very high.',
              },
              {
                q: 'What happens to my documents?',
                a: 'Your documents are stored securely and are only accessible to you. We use Supabase with row-level security — no other user can access your files.',
              },
              {
                q: 'Can I cancel anytime?',
                a: "Yes. Cancel anytime from your billing dashboard. You'll keep Pro access until the end of your billing period.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
