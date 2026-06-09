import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { plan } = await request.json();

  const variantIds: Record<string, string> = {
    pro: process.env.LEMON_SQUEEZY_PRO_VARIANT_ID!,
    team: process.env.LEMON_SQUEEZY_TEAM_VARIANT_ID!,
  };

  const variantId = variantIds[plan];
  if (!variantId) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
  }

  const checkoutUrl = `https://docschat.lemonsqueezy.com/checkout/buy/${variantId}?checkout[custom][user_id]=${user.id}&checkout[email]=${encodeURIComponent(user.email || '')}`;

  return NextResponse.json({ url: checkoutUrl });
}
