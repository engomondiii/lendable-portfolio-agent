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
        display: ['var(--font-cabinet)', 'sans-serif'],
        body: ['var(--font-sora)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      colors: {
        bg: {
          base: 'var(--color-bg-base)',
          surface: 'var(--color-bg-surface)',
          elevated: 'var(--color-bg-elevated)',
          overlay: 'var(--color-bg-overlay)',
        },
        brand: {
          primary: 'var(--color-brand-primary)',
          deep: 'var(--color-brand-deep)',
          subtle: 'var(--color-brand-subtle)',
          glow: 'var(--color-brand-glow)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border-subtle)',
          strong: 'var(--color-border-strong)',
        },
        risk: {
          danger: 'var(--color-risk-danger)',
          'danger-bg': 'var(--color-risk-danger-bg)',
          warning: 'var(--color-risk-warning)',
          'warning-bg': 'var(--color-risk-warning-bg)',
          caution: 'var(--color-risk-caution)',
          'caution-bg': 'var(--color-risk-caution-bg)',
          safe: 'var(--color-risk-safe)',
          'safe-bg': 'var(--color-risk-safe-bg)',
          neutral: 'var(--color-risk-neutral)',
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
        sidebar: '280px',
        'sql-panel': '360px',
        topbar: '56px',
        statusbar: '32px',
      },
      borderRadius: {
        DEFAULT: '6px',
        lg: '10px',
        xl: '14px',
        '2xl': '20px',
      },
      boxShadow: {
        'brand-glow': '0 0 20px var(--color-brand-glow)',
        'brand-glow-sm': '0 0 8px var(--color-brand-glow)',
        surface: '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        elevated: '0 4px 16px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.3)',
        modal: '0 20px 60px rgba(0,0,0,0.7)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.4s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.3s ease-out forwards',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        'pulse-dot': 'pulseDot 1.4s ease-in-out infinite',
        'shimmer': 'shimmer 1.8s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'stagger-1': 'fadeInUp 0.4s ease-out 0.1s forwards',
        'stagger-2': 'fadeInUp 0.4s ease-out 0.2s forwards',
        'stagger-3': 'fadeInUp 0.4s ease-out 0.3s forwards',
        'stagger-4': 'fadeInUp 0.4s ease-out 0.4s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseDot: {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: '0.4' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px var(--color-brand-glow)' },
          '50%': { boxShadow: '0 0 24px var(--color-brand-glow)' },
        },
      },
      backgroundImage: {
        'grid-pattern': "url('/images/grid-pattern.svg')",
        'shimmer-gradient':
          'linear-gradient(90deg, transparent 0%, rgba(46,204,113,0.05) 50%, transparent 100%)',
        'brand-gradient':
          'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-deep))',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};