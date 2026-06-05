import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C5F2E',
        'primary-light': '#4A8A4D',
        secondary: '#C17F3C',
        background: '#FAF7F2',
        surface: '#FFFFFF',
        'surface-warm': '#F3EDE3',
        'text-primary': '#1A1A1A',
        'text-secondary': '#5C5C5C',
        'text-muted': '#8C8C8C',
        border: '#E5DDD3',
        success: '#4A8A4D',
        warning: '#E8A838',
        flare: '#D64A2A',
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      fontSize: {
        caption: ['0.75rem', { lineHeight: '1.25rem' }],
        small: ['0.875rem', { lineHeight: '1.5rem' }],
        body: ['1.0625rem', { lineHeight: '1.75rem' }],
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
        pill: '100px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        md: '0 4px 16px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        lg: '0 8px 32px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)',
      },
      maxWidth: {
        content: '1200px',
        prose: '720px',
      },
      keyframes: {
        'fade-up': {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in': 'fade-in 0.3s ease forwards',
        'slide-up': 'slide-up 0.36s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
    },
  },
  plugins: [],
};

export default config;
