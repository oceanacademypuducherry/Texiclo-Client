/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        'custom-yellow': '#FFEEA5',
        "custom-black":'#000000',
        'custom-grey':'#808080',
        'custom-green':'#35B7A8',
        'custom-darkgreen':'#008000',
      },
      fontSize:{
        'xl': '1.25rem',
        '3xl': '1.875rem',
      },
      screens:{
        'max-lg': { max: '1100px' },
      }
    },
  },
  plugins: [],
}

