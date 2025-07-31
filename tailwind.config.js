
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
      },
      fonrFamily: {
        'sans': ['Avenir', 'Helvetica', 'Arial', 'sans-serif']
      },
      //this is animation class
      animation:{
        fade: 'yellowFade 3s ease-in-out'
      },
      keyframes:{
        yellowFade: {
          '0%': { backgroundColor: 'yellow' },
          '100%': { backgroundColor: 'transparent' }
        }
      }
  },
  darkMode: false,
  variants: {
    extend: {},
  },
  plugins: [],
}
}
