import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:          '#0d1b5e',
        'navy-deep':   '#080f38',
        'navy-muted':  '#1e2d6e',
        blue:          '#1E3A8A',
        'blue-light':  '#6B8EF5',
        green:         '#4CAF50',
        'green-dark':  '#3d9142',
        'page-tint':   '#f0f4ff',
        'border-light':'#dde4f5',
      },
      fontFamily: {
        sora: ['var(--font-sora)', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      maxWidth: {
        inner: '1200px',
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, #c5cfe8 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-grid': '24px 24px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
