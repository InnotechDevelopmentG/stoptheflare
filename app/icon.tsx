import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2C5F2E',
          borderRadius: 14,
          color: '#FAF7F2',
          fontSize: 40,
          fontWeight: 700,
          fontFamily: 'serif',
        }}
      >
        S
      </div>
    ),
    { ...size },
  );
}
