'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function PricingUpgradeHandler() {
  const searchParams = useSearchParams();
  const upgrade = searchParams.get('upgrade');

  useEffect(() => {
    if (upgrade) {
      handleUpgrade(upgrade);
    }
  }, [upgrade]);

  const handleUpgrade = async (plan: string) => {
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // silent fail
    }
  };

  return null;
}
