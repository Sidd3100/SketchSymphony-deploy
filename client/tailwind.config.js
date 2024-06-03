/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors:{
        'primary':'#030637',
        'sidd':'#01ee91'
      },
      fontFamily:{
        'ubuntu': ['Ubuntu', 'sans-serif'],
        'display':['Ubuntu','sans-serif'],
        'body':['Merriweather','sans-serif']
      }
    },
  },
  plugins: [],
}

