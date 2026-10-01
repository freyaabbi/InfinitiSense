/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep, intentional base (near-black navy)
        navy: {
          950: '#080b12',
          900: '#0c1019',
          850: '#11161f',
          800: '#161c28',
          700: '#1f2735',
          600: '#2b3545',
          500: '#3a465a',
        },
        // Single brand accent: solar amber/gold (energy)
        accent: {
          100: '#fdeecb',
          200: '#fbe0a3',
          300: '#ffd166',
          400: '#f7b733',
          500: '#f59e0b',
          600: '#d98213',
        },
        // Data-only cool tone (charts, live indicators) — never decorative
        data: {
          300: '#8fdae6',
          400: '#5ec8d8',
          500: '#2fa8ba',
        },
        // Dust / sand — problem states only
        dust: {
          200: '#e6d8bd',
          300: '#cdb98f',
          400: '#b09968',
        },
        ink: {
          100: '#e9edf4',
          200: '#ccd3df',
          300: '#b4bdcc',
          400: '#8792a3',
          500: '#616b7d',
          600: '#454e5e',
        },
      },
      fontFamily: {
        display: ['Manrope', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // controlled hierarchy
        caption: ['0.8125rem', { lineHeight: '1.4', fontWeight: '450' }],
        h3: ['1.375rem', { lineHeight: '1.3', fontWeight: '600' }],
        h2: ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
        h1: ['3.75rem', { lineHeight: '1.04', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      borderRadius: {
        btn: '8px',
        card: '12px',
        panel: '16px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.3), 0 8px 24px -16px rgba(0,0,0,0.6)',
        lift: '0 4px 16px -4px rgba(0,0,0,0.5)',
      },
      keyframes: {
        drawIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {},
    },
  },
  plugins: [],
}
