/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#1a1e2e',
        'bg-secondary': '#222636',
        'bg-tertiary': '#2a2f42',
        'bg-card': '#252a3a',
        'accent-cyan': '#00d4ff',
        'accent-cyan-dark': '#00a8cc',
        'accent-green': '#58cc02',
        'accent-green-dark': '#46a302',
        'accent-red': '#ff4b4b',
        'accent-orange': '#ff9600',
        'accent-gold': '#ffc800',
        'accent-purple': '#9b59b6',
        'text-primary': '#ffffff',
        'text-secondary': '#9fa3b1',
        'text-muted': '#5a5f72',
        'border-subtle': '#2e3347',
      },
      fontFamily: {
        'sans': ['Space Grotesk', 'sans-serif'],
        'mono': ['Space Mono', 'monospace'],
      },
      animation: {
        'bounce-in': 'bounceIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
        'shake': 'shake 0.5s ease-in-out',
        'pop': 'pop 0.2s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0, 212, 255, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.8)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0, 212, 255, 0.5)',
        'cyan-glow-lg': '0 0 40px rgba(0, 212, 255, 0.6)',
        'green-glow': '0 0 20px rgba(88, 204, 2, 0.5)',
        'red-glow': '0 0 20px rgba(255, 75, 75, 0.5)',
        'card': '0 4px 20px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}
