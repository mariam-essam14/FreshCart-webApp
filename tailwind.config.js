/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      GreenLight: '#0aad0a',
      GreayLight: '#f8f9fa',
      GrayDark:'#9ca3af',
      Black: '#212529',
      Red: '#dc3545',
      white: "#ffff",
      DarkBlak:"#1b1f24"


    },
    screens: {
      'xs': '300px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',

      // => @media (min-width: 1536px) { ... }
      ' 3xl': '2000px'
    },
    fontSize:{
      xxs:'0.6rem',
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    }
  },

  plugins: [],
}