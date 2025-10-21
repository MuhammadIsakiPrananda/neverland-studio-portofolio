// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Lexend', 'sans-serif'],
      },
      animation: {
        'grid-pan': 'grid-pan 15s linear infinite',
        'pulse-corner-tl': 'pulse-corner-tl 6s infinite',
        'pulse-corner-tr': 'pulse-corner-tr 6s infinite',
        'pulse-corner-bl': 'pulse-corner-bl 6s infinite',
        'pulse-corner-br': 'pulse-corner-br 6s infinite',
      },
      keyframes: {
        'grid-pan': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
        'pulse-corner-tl': {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
        'pulse-corner-tr': {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
        'pulse-corner-bl': {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
        'pulse-corner-br': {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
}