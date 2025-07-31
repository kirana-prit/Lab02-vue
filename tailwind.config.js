/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    extend: {
      boxShadow: {
        'sp': '0 3px 12px 0 rgba(0,0,0,0.2)',
    }
  },
  darkMode: false,
  variants: {
    extend: {},
  },
  plugins: [],
}
}
