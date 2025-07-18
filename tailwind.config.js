const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    extend: {
      colors: {
      'spotify-black': '#121212',
      'spotify-black-bg': '#121212',
      'spotify-green': '#1ED760',
      'spotify-green-bg': '#1ED760',
      'spotify-white': '#FFFFFF',
      'spotify-white-bg': '#FFFFFF',
      'spotify-gray': 'rgb(40,40,40)',
      'spotify-gray-bg': 'rgb(40,40,40)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};