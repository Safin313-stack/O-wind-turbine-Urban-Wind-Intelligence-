/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        porcelain: {
          50: '#FAF9F6',
          100: '#F5F3EF',
          200: '#EBE7E0',
          300: '#DDD7CD',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
          950: '#0C0A09',
        },
        space: {
          950: '#040711',
          900: '#070C1B',
          850: '#0B1226',
          800: '#0F1A34',
          750: '#142245',
          700: '#1C2E5C',
        },
        wind: {
          cyan: '#00E5FF',
          blue: '#0284C7',
          glow: '#0369A1',
        },
        energy: {
          green: '#10B981',
          emerald: '#059669',
          bright: '#00F5A0',
        },
        ai: {
          purple: '#A855F7',
          violet: '#8B5CF6',
          indigo: '#6366F1',
        },
        status: {
          warn: '#F59E0B',
          alert: '#EF4444',
          good: '#10B981',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Outfit"', 'system-ui', '-apple-system', 'sans-serif'],
        tech: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'spin-reverse': 'spin-reverse 15s linear infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'flow': 'flow 2s linear infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'aurora': 'aurora 20s ease-in-out infinite alternate',
        'aurora-spin': 'aurora-spin 28s linear infinite',
        'gradient-pulse': 'gradient-pulse 8s ease-in-out infinite',
      },
      keyframes: {
        'aurora': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(40px, -30px) scale(1.15)' },
          '100%': { transform: 'translate(-30px, 40px) scale(0.95)' },
        },
        'aurora-spin': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.12)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'gradient-pulse': {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        'border-beam': {
          '100%': {
            offsetDistance: '100%',
          },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'flow': {
          '0%': { strokeDashoffset: '40' },
          '100%': { strokeDashoffset: '0' },
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 229, 255, 0.25)',
        'glow-green': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'glow-purple': '0 0 25px -5px rgba(168, 85, 247, 0.25)',
      }
    },
  },
  plugins: [],
}
