# Stripe Testing Guide

Comprehensive testing patterns for Stripe integrations.

## Stripe CLI Setup

### Installation

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop install stripe

# Linux
curl -s https://packages.stripe.dev/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/stripe-cli-debian-local stable main" | sudo tee /etc/apt/sources.list.d/stripe.list
sudo apt update && sudo apt install stripe
```

### Authentication

```bash
# Login to your Stripe account
stripe login

# Verify connection
stripe config --list
```

---

## Local Webhook Testing

### Forward Webhooks

```bash
# Forward to local development server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Output includes webhook signing secret:
# > Ready! Your webhook signing secret is whsec_xxx (use this for local testing)
```

### Trigger Test Events

```bash
# Common test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.created
stripe trigger customer.subscription.updated
stripe trigger customer.subscription.deleted
stripe trigger invoice.payment_succeeded
stripe trigger invoice.payment_failed

# With custom data
stripe trigger checkout.session.completed \
  --add checkout_session:customer=cus_xxx \
  --add checkout_session:metadata.user_id=user_123
```

### Resend Events

```bash
# Resend a specific event from your account
stripe events resend evt_xxx

# List recent events
stripe events list --limit 10
```

---

## Test Cards

### Successful Payments

| Number | Description |
|--------|-------------|
| `4242424242424242` | Visa - always succeeds |
| `5555555555554444` | Mastercard - always succeeds |
| `378282246310005` | Amex - always succeeds |

### Declined Cards

| Number | Decline Code |
|--------|--------------|
| `4000000000000002` | `card_declined` |
| `4000000000009995` | `insufficient_funds` |
| `4000000000009987` | `lost_card` |
| `4000000000009979` | `stolen_card` |
| `4000000000000069` | `expired_card` |
| `4000000000000127` | `incorrect_cvc` |

### 3D Secure Testing

| Number | Behavior |
|--------|----------|
| `4000002500003155` | Requires authentication |
| `4000002760003184` | Requires auth, succeeds |
| `4000008260003178` | Requires auth, fails |
| `4000000000003220` | 3DS2 required |

### Special Cases

| Number | Behavior |
|--------|----------|
| `4000000000000341` | Attaching to customer fails |
| `4000000000003055` | SCA required for off-session |
| `4000003800000446` | Always requires PIN |

---

## Integration Test Patterns

### Test Checkout Flow

```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

describe('Checkout Flow', () => {
  let customerId: string;
  let priceId: string;

  beforeAll(async () => {
    // Create test customer
    const customer = await stripe.customers.create({
      email: `test-${Date.now()}@example.com`,
      metadata: { test: 'true' },
    });
    customerId = customer.id;

    // Create test product and price
    const product = await stripe.products.create({
      name: 'Test Product',
      metadata: { test: 'true' },
    });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 1000,
      currency: 'usd',
      recurring: { interval: 'month' },
    });
    priceId = price.id;
  });

  afterAll(async () => {
    // Cleanup test data
    const customers = await stripe.customers.list({
      email: `test-`,
      limit: 100,
    });
    for (const customer of customers.data) {
      if (customer.metadata.test === 'true') {
        await stripe.customers.del(customer.id);
      }
    }
  });

  it('creates checkout session', async () => {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    expect(session.id).toMatch(/^cs_/);
    expect(session.customer).toBe(customerId);
  });
});
```

### Test Webhook Handler

```typescript
import { describe, it, expect, vi } from 'vitest';
import { handleWebhook } from './webhook-handler';
import Stripe from 'stripe';

describe('Webhook Handler', () => {
  it('processes checkout.session.completed', async () => {
    const mockEvent: Stripe.Event = {
      id: 'evt_test_123',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_xxx',
          customer: 'cus_xxx',
          subscription: 'sub_xxx',
          metadata: { user_id: 'user_123' },
        } as Stripe.Checkout.Session,
      },
      // ... other required fields
    } as Stripe.Event;

    const result = await handleWebhook(mockEvent);

    expect(result.status).toBe('processed');
  });

  it('handles idempotent events', async () => {
    const mockEvent = createMockEvent('checkout.session.completed');

    // First call processes
    await handleWebhook(mockEvent);

    // Second call is idempotent
    const result = await handleWebhook(mockEvent);
    expect(result.status).toBe('duplicate');
  });
});
```

---

## E2E Test Patterns

### Playwright Checkout Test

```typescript
import { test, expect } from '@playwright/test';

test('complete checkout flow', async ({ page }) => {
  // Navigate to pricing page
  await page.goto('/pricing');

  // Click subscribe button
  await page.click('[data-testid="subscribe-pro"]');

  // Wait for Stripe Checkout redirect
  await page.waitForURL(/checkout\.stripe\.com/);

  // Fill Stripe Checkout form
  await page.fill('[data-testid="card-number"]', '4242424242424242');
  await page.fill('[data-testid="card-expiry"]', '12/30');
  await page.fill('[data-testid="card-cvc"]', '123');
  await page.fill('[data-testid="billing-name"]', 'Test User');
  await page.fill('[data-testid="email"]', 'test@example.com');

  // Submit payment
  await page.click('[data-testid="submit-button"]');

  // Wait for redirect back to success page
  await page.waitForURL('/success');
  await expect(page.locator('h1')).toContainText('Welcome');
});
```

### Mock Stripe in Tests

```typescript
// __mocks__/stripe.ts
export default class Stripe {
  customers = {
    create: vi.fn().mockResolvedValue({ id: 'cus_mock' }),
    retrieve: vi.fn().mockResolvedValue({ id: 'cus_mock', email: 'test@example.com' }),
  };

  subscriptions = {
    create: vi.fn().mockResolvedValue({ id: 'sub_mock', status: 'active' }),
    retrieve: vi.fn().mockResolvedValue({ id: 'sub_mock', status: 'active' }),
  };

  webhooks = {
    constructEvent: vi.fn().mockImplementation((body, sig, secret) => JSON.parse(body)),
  };
}
```

---

## Test Data Management

### Cleanup Script

```typescript
// scripts/cleanup-test-stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function cleanup() {
  console.log('Cleaning up test Stripe data...');

  // Delete test customers (identified by metadata or email pattern)
  const customers = await stripe.customers.list({ limit: 100 });
  for (const customer of customers.data) {
    if (customer.metadata?.test === 'true' || customer.email?.includes('test-')) {
      console.log(`Deleting customer: ${customer.id}`);
      await stripe.customers.del(customer.id);
    }
  }

  // Archive test products
  const products = await stripe.products.list({ limit: 100 });
  for (const product of products.data) {
    if (product.metadata?.test === 'true') {
      console.log(`Archiving product: ${product.id}`);
      await stripe.products.update(product.id, { active: false });
    }
  }

  console.log('Cleanup complete');
}

cleanup().catch(console.error);
```

### Fixture Generation

```typescript
// tests/fixtures/stripe.ts
export async function createTestSubscription(stripe: Stripe, customerId: string) {
  const product = await stripe.products.create({
    name: 'Test Product',
    metadata: { test: 'true' },
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: 1000,
    currency: 'usd',
    recurring: { interval: 'month' },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: price.id }],
    metadata: { test: 'true' },
  });

  return { product, price, subscription };
}
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Stripe Integration Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Stripe CLI
        run: |
          curl -s https://packages.stripe.dev/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
          echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/stripe-cli-debian-local stable main" | sudo tee /etc/apt/sources.list.d/stripe.list
          sudo apt update && sudo apt install stripe

      - name: Run tests
        env:
          STRIPE_SECRET_KEY: ${{ secrets.STRIPE_TEST_SECRET_KEY }}
        run: npm test

      - name: Cleanup test data
        if: always()
        env:
          STRIPE_SECRET_KEY: ${{ secrets.STRIPE_TEST_SECRET_KEY }}
        run: npx tsx scripts/cleanup-test-stripe.ts
```
