/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Backgrounds ──────────────────────────────────────────────
        'bg-primary':    '#f8f9fc',
        'bg-secondary':  '#ffffff',
        'bg-tertiary':   '#f0f2f8',

        // ── Accent (Indigo) ─────────────────────────────────────────
        'accent':        '#6366f1',
        'accent-dark':   '#4f46e5',
        'accent-light':  '#e0e7ff',

        // ── Semantic colors ─────────────────────────────────────────
        'accent-green':  '#22c55e',
        'accent-green-light': '#dcfce7',
        'accent-red':    '#ef4444',
        'accent-red-light': '#fee2e2',
        'accent-orange': '#f97316',
        'accent-gold':   '#eab308',
        'accent-coral':  '#f97316',
        'accent-purple': '#8b5cf6',

        // ── Text ─────────────────────────────────────────────────────
        'text-primary':  '#111827',
        'text-secondary':'#374151',
        'text-muted':    '#9ca3af',

        // ── Borders ──────────────────────────────────────────────────
        'border':        '#e5e7eb',
        'border-strong': '#d1d5db',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
      },
      animation: {
        'bounce-in':      'bounceIn 0.4s cubic-bezier(0.68,-0.55,0.265,1.55)',
        'fade-in':        'fadeIn 0.3s ease-out',
        'fade-in-up':     'fadeInUp 0.4s cubic-bezier(0.4,0,0.2,1)',
        'slide-up':       'slideUp 0.35s cubic-bezier(0.4,0,0.2,1)',
        'slide-down':     'slideDown 0.35s cubic-bezier(0.4,0,0.2,1)',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-soft':     'pulseSoft 2s ease-in-out infinite',
        'shake':          'shake 0.5s ease-in-out',
        'pop':            'pop 0.25s cubic-bezier(0.68,-0.55,0.265,1.55)',
        'float':          'float 3s ease-in-out infinite',
        'progress-fill':  'progressFill 0.6s cubic-bezier(0.4,0,0.2,1)',
        'toast-in':       'toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        'toast-out':      'toastOut 0.3s ease-in forwards',
        'accordion-open': 'accordionOpen 0.35s cubic-bezier(0.4,0,0.2,1)',
        'spin-slow':      'spin 1.5s linear infinite',
      },
      keyframes: {
        bounceIn: {
          '0%':   { transform: 'scale(0.3)', opacity: '0' },
          '50%':  { transform: 'scale(1.05)' },
          '70%':  { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%':   { transform: 'translateY(-12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%':   { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%':      { transform: 'translateX(-8px)' },
          '40%':      { transform: 'translateX(8px)' },
          '60%':      { transform: 'translateX(-4px)' },
          '80%':      { transform: 'translateX(4px)' },
        },
        pop: {
          '0%':   { transform: 'scale(1)' },
          '50%':  { transform: 'scale(1.18)' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        progressFill: {
          '0%':   { width: '0%' },
        },
        toastIn: {
          '0%':   { opacity: '0', transform: 'translateY(-20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        toastOut: {
          '0%':   { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-16px) scale(0.95)' },
        },
        accordionOpen: {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'card':        '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-md':     '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.05)',
        'card-lg':     '0 8px 24px rgba(0,0,0,0.10)',
        'accent-sm':   '0 4px 14px rgba(99,102,241,0.35)',
        'accent-md':   '0 6px 20px rgba(99,102,241,0.45)',
        'green-sm':    '0 4px 14px rgba(34,197,94,0.30)',
        'inner':       'inset 0 2px 4px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
