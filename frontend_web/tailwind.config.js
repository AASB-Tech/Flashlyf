/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        FFblue: "#3734a6",
        FFyellow: "#f7c710",
        FForange: "#fb4f00",
        FFgrey: "#e6e6e6",
        FFbluelink: "#000080",
        FFred: "#ff3131",
        FFgreen: "#23cb98",
        hashtagblue: "#2a27aa",
        inactivegrey: "#4d4d4d",
        placeholdergrey: "#8e8e8e",
        offwhite: "#f9f9f9",
      },
      fontFamily: {
        'ubuntu': ['Ubuntu', 'sans-serif']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
    }
  },
  plugins: []
};
