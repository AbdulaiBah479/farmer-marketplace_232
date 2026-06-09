import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get('x-signature') || '';

  if (!verifySignature(payload, signature, process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(payload);
  const eventName = event.meta?.event_name;
  const customData = event.meta?.custom_data;
  const userId = customData?.user_id;

  if (!userId) {
    return NextResponse.json({ error: 'No user ID' }, { status: 400 });
  }

  const subscriptionData = event.data?.attributes;

  switch (eventName) {
    case 'subscription_created':
    case 'subscription_updated': {
      const variantId = subscriptionData?.variant_id?.toString();
      let plan = 'free';

      if (variantId === process.env.LEMON_SQUEEZY_PRO_VARIANT_ID) {
        plan = 'pro';
      } else if (variantId === process.env.LEMON_SQUEEZY_TEAM_VARIANT_ID) {
        plan = 'team';
      }

      await supabase
        .from('profiles')
        .update({
          plan,
          lemon_squeezy_customer_id: subscriptionData?.customer_id?.toString(),
          lemon_squeezy_subscription_id: event.data?.id,
          subscription_status: subscriptionData?.status,
        })
        .eq('id', userId);
      break;
    }

    case 'subscription_cancelled':
    case 'subscription_expired': {
      await supabase
        .from('profiles')
        .update({
          plan: 'free',
          subscription_status: 'cancelled',
        })
        .eq('id', userId);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
