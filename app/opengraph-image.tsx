import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'StopTheFlare — Honest, research-backed autoimmune supplement guides';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#FAF7F2',
          backgroundImage: 'linear-gradient(135deg, #FAF7F2 0%, #F3EDE3 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 34,
            fontWeight: 600,
            color: '#2C5F2E',
            letterSpacing: '-0.5px',
          }}
        >
          StopTheFlare
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 36,
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.1,
            color: '#1A1A1A',
            letterSpacing: '-1.5px',
            maxWidth: 900,
          }}
        >
          Honest, research-backed autoimmune supplement guides
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 32,
            fontSize: 30,
            color: '#5C5C5C',
            maxWidth: 880,
          }}
        >
          No brand sponsorships. No miracle cures. Just real research.
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 'auto',
            fontSize: 24,
            color: '#8C8C8C',
          }}
        >
          stoptheflare.com
        </div>
      </div>
    ),
    { ...size },
  );
}
