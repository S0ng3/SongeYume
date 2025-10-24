/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#151823',
        'text-light': '#dde5f2',
        'accent': '#e09e29',
        'card-bg': '#1e2230',
        'card-hover': '#252938'
      },
      fontFamily: {
        'serif': ['Merriweather', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'book': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'book-hover': '0 10px 15px -3px rgba(224, 158, 41, 0.3), 0 4px 6px -2px rgba(224, 158, 41, 0.2)'
      }
    },
  },
  plugins: [],
}

