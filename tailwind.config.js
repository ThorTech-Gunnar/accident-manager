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
          DEFAULT: '#2c5282',
          light: '#4299e1',
          dark: '#2a4365',
        },
        secondary: {
          DEFAULT: '#63b3ed',
          dark: '#3182ce',
        },
        accent: '#4fd1c5',
        background: '#f7fafc',
        surface: '#ffffff',
        text: {
          DEFAULT: '#2d3748',
          light: '#4a5568',
        },
        border: '#e2e8f0',
        success: '#48bb78',
        warning: '#ecc94b',
        danger: '#f56565',
      },
    },
  },
  plugins: [],
};