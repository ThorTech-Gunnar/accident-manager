/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#8a4baf',
          light: '#b088c9',
          dark: '#663399',
        },
        secondary: {
          DEFAULT: '#d8bfd8',
          dark: '#b088c9',
        },
        accent: '#e6e6fa',
        background: '#f8f9fa',
        surface: '#ffffff',
        text: {
          DEFAULT: '#333333',
          light: '#666666',
        },
        border: '#e0e0e0',
        success: '#48bb78',
        warning: '#ecc94b',
        danger: '#f56565',
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0,0,0,0.10)',
        },
        '.transition-fast': {
          transition: 'all 0.2s ease',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};
