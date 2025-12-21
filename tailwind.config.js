/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        modam: ["Modam", "sans-serif"],
        museo: ["MuseoModerno", "sans-serif"],
      },
      colors: {
        primary: {
          light: "#00c9d3",
          base: "#0c3649",
          pale: "#dce8ef",
        },
      },
    },
  },
  plugins: [],
};
