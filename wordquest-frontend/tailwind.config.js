/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        game: ['Cinzel Decorative', 'serif'],
        title: ['Cinzel', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
      colors: {
        gold: '#f4c542',
        'gold-light': '#ffe88a',
        'game-dark': '#0a0612',
        'game-purple': '#6b21a8',
      }
    },
  },
  plugins: [],
}