import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;

const CONDITION_LABELS: Record<string, string> = {
  hashimotos: "Hashimoto's & Thyroid Disease",
  'gut-health': 'Gut Health, IBD & Crohn\'s',
  'eczema-psoriasis': 'Eczema, Psoriasis & Autoimmune Skin',
  'fibromyalgia-chronic-fatigue': 'Fibromyalgia & Chronic Fatigue',
  'histamine-mcas': 'Histamine Intolerance & MCAS',
};

export async function POST(req: NextRequest) {
  const { email, condition } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  if (!AUDIENCE_ID) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  try {
    // Add to Resend audience
    await resend.contacts.create({
      email,
      audienceId: AUDIENCE_ID,
      unsubscribed: false,
    });

    // Send welcome email
    const conditionLabel = CONDITION_LABELS[condition] ?? 'autoimmune health';
    await resend.emails.send({
      from: 'StopTheFlare <hello@stoptheflare.com>',
      to: email,
      subject: `Your ${conditionLabel} guide is ready`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
          <h2 style="font-size:22px;margin-bottom:8px">Welcome to StopTheFlare</h2>
          <p style="color:#555;margin-bottom:16px">
            Thanks for signing up. You'll receive research-backed tips and honest product guidance for
            <strong>${conditionLabel}</strong> — no sponsored content, ever.
          </p>
          <a href="https://stoptheflare.com/${condition}"
            style="display:inline-block;background:#2C5F2E;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-bottom:24px">
            Read the ${conditionLabel} Guide →
          </a>
          <p style="color:#999;font-size:12px">
            You can <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#999">unsubscribe</a> at any time.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error('subscribe error', err);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
