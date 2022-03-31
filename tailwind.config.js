const {  collapseTextChangeRangesAcrossMultipleVersions,} = require("typescript");
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkmode: false,
  theme: {    
    extend: {
      colors: {
        gray: colors.neutral
      },
    },
  },
  plugins: [],
};
