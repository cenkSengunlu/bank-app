/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-white": "rgba(255,255,255,0.17)",
        "smooth-white": "#FBFEFF",
        "dark-purple": "#341d6f",
        "light-purple": "#6c2db4",
        "primary-purple": "#5e40a4",
        "secondary-purple": "#e4e1ff",
        "smooth-pink": "#ff5895",
        "light-green": "#dff3ea",
        "smooth-green": "#3dca85",
        "smooth-gray": "#e5e7eb",
      },
    },
  },
  plugins: [],
};
