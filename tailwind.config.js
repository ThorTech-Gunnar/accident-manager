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
          DEFAULT: '#8a4baf', // Medium purple
          light: '#b088c9', // Light purple
          dark: '#663399', // Dark purple (closer to logo color)
        },
        secondary: {
          DEFAULT: '#d8bfd8', // Thistle (light purple)
          dark: '#b088c9', // Light purple (same as primary.light for consistency)
        },
        accent: '#e6e6fa', // Lavender (very light purple)
        background: '#ffffff', // White
        surface: '#faf0ff', // Very light purple (almost white)
        text: {
          DEFAULT: '#4a0e4e', // Dark purple for text
          light: '#7c3aed', // Lighter purple for less emphasis
        },
        border: '#d8bfd8', // Thistle (light purple, same as secondary)
        success: '#48bb78', // Keep existing success color
        warning: '#ecc94b', // Keep existing warning color
        danger: '#f56565', // Keep existing danger color
      },
    },
  },
  plugins: [],
};
