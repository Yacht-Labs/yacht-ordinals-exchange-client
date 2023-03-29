/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "yacht-white": "#F9FBF2",
      "light-text": "#A9B7BF",
      "yacht-red": "#AD1D1D",
    },
    fontFamily: {
      bookmania: ["bookmania", "sans-serif"],
      "akkurat-bold": ["akkurat-bold", "sans-serif"],
      "akkurat-regular": ["akkurat-regular", "sans-serif"],
    },
    extend: {
      spacing: {
        "2/3": "66.6666%",
        "1/2": "50%",
        "1/1": "100%",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
