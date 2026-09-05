/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Tajawal', 'system-ui', 'sans-serif'],
        arabic: ['Tajawal', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#04070d',
          900: '#070c17',
          850: '#0a1120',
          800: '#0d1626',
          700: '#131f35',
          600: '#1b2c47',
          500: '#243a5c',
        },
        teal: {
          400: '#4fd8c9',
          500: '#2bc4b3',
          600: '#199e90',
        },
        status: {
          normal: '#3ddc84',
          elevated: '#f5b942',
          high: '#f2554b',
          guidance: '#37d0ff',
        },
      },
      boxShadow: {
        glow: '0 0 24px rgba(79, 216, 201, 0.35)',
        'glow-blue': '0 0 24px rgba(55, 208, 255, 0.4)',
      },
      keyframes: {
        flow: {
          '0%': { strokeDashoffset: '40' },
          '100%': { strokeDashoffset: '0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        flow: 'flow 1.2s linear infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
        fadeIn: 'fadeIn 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
