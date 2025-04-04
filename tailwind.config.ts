/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}" 
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#C90083",
        background: "#ffffff",
        foreground: "#000000",
        card: "#f5f5f5",
        border: "#dbdbdb",
        dark: {
          background: "#000000",
          foreground: "#ffffff",
          card: "#262626",
          border: "#383838",
        },
      },
      fontFamily: {
        sans: ["FootspringRegular", "sans-serif"],
        footspringBold: ["FootspringBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
