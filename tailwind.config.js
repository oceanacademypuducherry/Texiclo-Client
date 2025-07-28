/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       animation: {
    slideProgress: 'slideProgress 3s linear forwards',
  },
  keyframes: {
    slideProgress: {
      '0%': { width: '0%' },
      '100%': { width: '100%' },
    },
  },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        //  sans: ['Nunito Sans', "sans-serif"],
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
        'below-1000': { max: '1200px' }, 
         'max-1300': {'max': '1300px'},
      }
    },
    
  },
  
  plugins: [
    
  ],
}

