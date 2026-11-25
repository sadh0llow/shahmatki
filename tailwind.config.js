/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        chess: {
          light: "#f0d9b5",
          dark: "#b58863",
          accent: "#769656",
        },
      },
    },
  },
  plugins: [],
}