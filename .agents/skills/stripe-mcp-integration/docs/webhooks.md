# Webhook Security Patterns

This document covers advanced webhook patterns for secure Stripe integration.

## Webhook Secret Rotation

Rotate webhook secrets periodically without downtime:

```typescript
// Support multiple secrets during rotation window
const WEBHOOK_SECRETS = [
  process.env.STRIPE_WEBHOOK_SECRET_NEW,
  process.env.STRIPE_WEBHOOK_SECRET_OLD,
].filter(Boolean) as string[];

async function verifyWebhook(body: string, signature: string): Promise<Stripe.Event | null> {
  for (const secret of WEBHOOK_SECRETS) {
    try {
      return stripe.webhooks.constructEvent(body, signature, secret);
    } catch {
      continue; // Try next secret
    }
  }
  return null; // No valid signature
}
```

### Rotation Process

1. Generate new endpoint in Stripe Dashboard (new secret issued)
2. Add `STRIPE_WEBHOOK_SECRET_NEW` to environment
3. Deploy with both secrets active
4. After 24h, remove old secret
5. Rename `_NEW` to primary

---

## Idempotency

Stripe events may be delivered multiple times. Implement idempotency:

```typescript
// Use any database client (Postgres, MySQL, etc.)
import { db } from './database';

async function handleWebhook(event: Stripe.Event) {
  // Check if already processed
  const existing = await db.query(
    'SELECT id FROM processed_events WHERE stripe_event_id = $1',
    [event.id]
  );

  if (existing.rows.length > 0) {
    console.log(`Event ${event.id} already processed, skipping`);
    return { status: 'duplicate' };
  }

  // Process event...

  // Mark as processed
  await db.query(
    `INSERT INTO processed_events (stripe_event_id, event_type, processed_at)
     VALUES ($1, $2, $3)`,
    [event.id, event.type, new Date().toISOString()]
  );

  return { status: 'processed' };
}
```

### Database Schema

```sql
CREATE TABLE processed_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL,
  processed_at TIMESTAMPTZ DEFAULT NOW(),
  -- Auto-cleanup: remove events older than 30 days
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_processed_events_stripe_id ON processed_events(stripe_event_id);
```

---

## Retry Handling

Stripe retries failed webhooks for up to 3 days. Handle gracefully:

```typescript
async function handleWebhook(request: Request): Promise<Response> {
  try {
    const event = await verifyAndParse(request);
    await processEvent(event);
    return new Response('OK', { status: 200 });
  } catch (error) {
    if (error instanceof TemporaryError) {
      // Return 5xx to trigger Stripe retry
      console.error('Temporary failure, will retry:', error);
      return new Response('Temporary Error', { status: 503 });
    }

    // Permanent failure - don't retry
    console.error('Permanent failure:', error);
    return new Response('OK', { status: 200 }); // Acknowledge to stop retries
  }
}

class TemporaryError extends Error {}
```

### Retry Schedule

| Attempt | Delay |
|---------|-------|
| 1 | Immediate |
| 2 | 5 minutes |
| 3 | 1 hour |
| 4 | 6 hours |
| 5+ | 24 hours (up to 72h total) |

---

## Event Ordering

Events may arrive out of order. Use `created` timestamp for ordering:

```typescript
async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  // Check current state in your database
  const result = await db.query(
    'SELECT stripe_updated_at FROM subscriptions WHERE stripe_id = $1',
    [subscription.id]
  );
  const current = result.rows[0];

  // Skip if we have a newer event already processed
  if (current && current.stripe_updated_at > subscription.created) {
    console.log('Skipping stale event');
    return;
  }

  // Upsert subscription state
  await db.query(
    `INSERT INTO subscriptions (stripe_id, status, stripe_updated_at)
     VALUES ($1, $2, $3)
     ON CONFLICT (stripe_id) DO UPDATE SET
       status = EXCLUDED.status,
       stripe_updated_at = EXCLUDED.stripe_updated_at`,
    [subscription.id, subscription.status, subscription.created]
  );
}
```

---

## Webhook Endpoint Patterns

### Single Endpoint (Simple)

```
POST /api/webhooks/stripe
```

All events to one handler with switch statement.

### Event-Specific Endpoints (Microservices)

```
POST /api/webhooks/stripe/checkout
POST /api/webhooks/stripe/subscriptions
POST /api/webhooks/stripe/invoices
```

Configure separate webhook endpoints in Stripe for each.

### Benefits of Separation

- Independent scaling
- Isolated failure domains
- Cleaner code organization
- Easier testing

---

## Security Checklist

- [ ] Always verify webhook signatures
- [ ] Use HTTPS endpoints only
- [ ] Implement idempotency for all handlers
- [ ] Log events for debugging (mask sensitive data)
- [ ] Set up monitoring for failed webhooks
- [ ] Rotate secrets at least annually
- [ ] Test with Stripe CLI before production
