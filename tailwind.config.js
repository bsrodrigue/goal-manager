/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        'gm': {
          '50': '#eafcff',
          '100': '#dbf6ff',
          '200': '#bce9ff',
          '300': '#8eceff',
          '400': '#65a8ff',
          '500': '#417bff',
          '600': '#2348ff',
          '700': '#182dec',
          '800': '#1520bc',
          '900': '#191d8a',
          '950': '#121056',
        },
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],

  daisyui: {
    themes: ['light', 'cupcake'],
  }
}

