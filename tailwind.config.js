/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Set the default sans font to Comfortaa Light (weight 300)
        sans: ['Comfortaa', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
