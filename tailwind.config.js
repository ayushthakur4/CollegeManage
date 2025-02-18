/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { 
      fontFamily: {
        // Add custom fonts here
      },
      colors: {
        'custom-green': '#035d1a',
      },
    },
  },
  darkMode: 'class', // Moved this inside the main object
  plugins: [
    require('daisyui'),
  ],
};
