/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      black: {
        800: "#393848"
      },
      white: {
        DEFAULT: "#fff"
      }
    },
    extend: {},
  },
  plugins: [],
}

