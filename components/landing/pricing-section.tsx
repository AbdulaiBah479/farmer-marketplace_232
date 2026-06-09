'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out DocChat',
    features: [
      '3 documents',
      '50 questions total',
      'PDF & Word support',
      'URL import',
      'Chat history',
    ],
    cta: 'Get started free',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    description: 'For professionals and power users',
    features: [
      '50 documents',
      'Unlimited questions',
      'PDF, Word & URL support',
      'Priority AI processing',
      'Export chat history',
      'Email support',
    ],
    cta: 'Start Pro',
    href: '/signup?plan=pro',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$29',
    period: 'per month',
    description: 'For teams and organizations',
    features: [
      'Unlimited documents',
      'Unlimited questions',
      'Team document sharing',
      'Priority AI processing',
      'Export & API access',
      'Priority support',
    ],
    cta: 'Start Team',
    href: '/signup?plan=team',
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-500">No hidden fees. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-105'
                  : 'bg-white border border-gray-100 shadow-sm'
              }`}
            >
              <div className="mb-6">
                <h3 className={`font-bold text-lg mb-1 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm pb-1 ${plan.highlighted ? 'text-indigo-200' : 'text-gray-500'}`}>
                    /{plan.period}
                  </span>
                </div>
                <p className={`text-sm ${plan.highlighted ? 'text-indigo-100' : 'text-gray-500'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className={`h-4 w-4 flex-shrink-0 ${plan.highlighted ? 'text-indigo-200' : 'text-indigo-600'}`} />
                    <span className={plan.highlighted ? 'text-indigo-50' : 'text-gray-600'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button
                  variant={plan.highlighted ? 'secondary' : 'primary'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
