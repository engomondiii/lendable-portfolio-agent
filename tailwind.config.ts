/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-cabinet)', 'var(--font-inter)', 'sans-serif'],
        body:    ['var(--font-sora)',    'var(--font-inter)', 'sans-serif'],
        mono:    ['var(--font-dm-mono)', 'monospace'],
      },
      fontSize: {
        // Override defaults to start at 16px base
        'xs':   ['0.8125rem',  { lineHeight: '1.4' }],   // 13px
        'sm':   ['0.9375rem',  { lineHeight: '1.5' }],   // 15px
        'base': ['1rem',       { lineHeight: '1.6' }],   // 16px
        'lg':   ['1.125rem',   { lineHeight: '1.5' }],   // 18px
        'xl':   ['1.25rem',    { lineHeight: '1.4' }],   // 20px
        '2xl':  ['1.5rem',     { lineHeight: '1.3' }],   // 24px
        '3xl':  ['1.875rem',   { lineHeight: '1.2' }],   // 30px
        '4xl':  ['2.25rem',    { lineHeight: '1.1' }],   // 36px
      },
      colors: {
        bg: {
          base:     'var(--color-bg-base)',
          surface:  'var(--color-bg-surface)',
          elevated: 'var(--color-bg-elevated)',
          card:     'var(--color-bg-card)',
          hover:    'var(--color-bg-hover)',
          overlay:  'var(--color-bg-overlay)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          bright:  'var(--color-accent-bright)',
          dim:     'var(--color-accent-dim)',
          subtle:  'var(--color-accent-subtle)',
          glow:    'var(--color-accent-glow)',
        },
        // Keep brand aliases for existing components
        brand: {
          primary: 'var(--color-brand-primary)',
          deep:    'var(--color-brand-deep)',
          subtle:  'var(--color-brand-subtle)',
          glow:    'var(--color-brand-glow)',
        },
        text: {
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary:  'var(--color-text-tertiary)',
          muted:     'var(--color-text-muted)',
          inverse:   'var(--color-text-inverse)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          subtle:  'var(--color-border-subtle)',
          strong:  'var(--color-border-strong)',
          accent:  'var(--color-border-accent)',
        },
        risk: {
          danger:       'var(--color-risk-danger)',
          'danger-bg':  'var(--color-risk-danger-bg)',
          warning:      'var(--color-risk-warning)',
          'warning-bg': 'var(--color-risk-warning-bg)',
          caution:      'var(--color-risk-caution)',
          'caution-bg': 'var(--color-risk-caution-bg)',
          safe:         'var(--color-risk-safe)',
          'safe-bg':    'var(--color-risk-safe-bg)',
          neutral:      'var(--color-risk-neutral)',
          'neutral-bg': 'var(--color-risk-neutral-bg)',
        },
        chart: {
          1: 'var(--color-chart-1)',
          2: 'var(--color-chart-2)',
          3: 'var(--color-chart-3)',
          4: 'var(--color-chart-4)',
          5: 'var(--color-chart-5)',
        },
      },
      spacing: {
        sidebar:    '280px',
        'sql-panel':'380px',
        topbar:     '60px',
        statusbar:  '36px',
      },
      borderRadius: {
        DEFAULT: '6px',
        lg:  '8px',
        xl:  '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'brand-glow':    '0 0 24px var(--color-accent-glow)',
        'brand-glow-sm': '0 0 10px var(--color-accent-glow)',
        surface:  '0 1px 3px rgba(0,0,0,0.6)',
        elevated: '0 4px 20px rgba(0,0,0,0.8)',
        modal:    '0 25px 80px rgba(0,0,0,0.9)',
      },
      animation: {
        'fade-in':       'fadeIn 0.25s ease-out forwards',
        'fade-in-up':    'fadeInUp 0.3s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.25s ease-out forwards',
        'slide-in-right':'slideInRight 0.25s ease-out forwards',
        'pulse-dot':     'pulseDot 1.4s ease-in-out infinite',
        'shimmer':       'shimmer 1.8s linear infinite',
        'glow-pulse':    'glowPulse 2s ease-in-out infinite',
        'spin-slow':     'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseDot: {
          '0%, 80%, 100%': { transform: 'scale(0.55)', opacity: '0.35' },
          '40%':           { transform: 'scale(1)',    opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.8' },
          '50%':      { opacity: '1' },
        },
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, var(--color-accent), var(--color-accent-dim))',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};