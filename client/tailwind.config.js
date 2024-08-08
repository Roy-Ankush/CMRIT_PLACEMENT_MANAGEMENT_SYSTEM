/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        's': {'max': '640px'},
        'm': {'max': '767px'},
      }
    },
  },
  plugins: [
  ],
}