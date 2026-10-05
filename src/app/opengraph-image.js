import { ImageResponse } from 'next/og';

// Default social preview image for every page (1200x630), generated at build time.
export const alt = 'Logo Makers Pro: custom logo design services';
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
          justifyContent: 'space-between',
          background: '#121212',
          color: '#ffffff',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, letterSpacing: 6, color: '#05d1e5', textTransform: 'uppercase' }}>
          Logo Makers Pro
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>Custom Logo</div>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>Design Services</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 30, color: '#c2c2c2' }}>
          <span>Logos, websites and branding</span>
          <span>logomakerspro.com</span>
        </div>
      </div>
    ),
    size,
  );
}
