import type { Metadata } from 'next';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Medical Disclaimer',
  description:
    'StopTheFlare is for informational purposes only and does not constitute medical advice. Always consult a qualified healthcare provider.',
  alternates: { canonical: canonical('/disclaimer') },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-prose px-4 py-16 sm:px-6">
      <h1 className="font-serif text-4xl font-semibold">Medical Disclaimer</h1>
      <p className="mt-2 text-small text-text-muted">Last updated: June 2026</p>
      <div className="prose-editorial mt-8">
        <p>
          StopTheFlare.com is for informational and educational purposes only. Nothing on this site
          constitutes medical advice, diagnosis, or treatment. We are not doctors, and the content
          here is not a substitute for professional medical care.
        </p>
        <p>
          Always consult a qualified healthcare provider before starting any supplement, changing
          your diet, or altering any treatment plan — especially if you are pregnant, nursing,
          taking medication, or managing a diagnosed condition. Supplements can interact with
          medications and are not appropriate for everyone.
        </p>
        <p>
          Statements about supplements on this site have not been evaluated by the Food and Drug
          Administration. These products are not intended to diagnose, treat, cure, or prevent any
          disease.
        </p>
        <p>
          You are responsible for your own health decisions. StopTheFlare and its contributors
          assume no liability for any actions taken based on the information provided here. If you
          are experiencing a medical emergency, call your local emergency number immediately.
        </p>
      </div>
    </div>
  );
}
