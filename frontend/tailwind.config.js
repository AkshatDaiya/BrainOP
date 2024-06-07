/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(220.55deg, #DD7BFF 0%, #FF6C6C 100%)",
        "custom-gradient2":
          "linear-gradient(354deg, #FFBB89 29%, #7B6AE0 100%);",
        "custom-gradient3":
          "linear-gradient(220.55deg, #FFF6EB 0%, #DFD1C5 100%);",
        "custom-gradient4":
          "linear-gradient(220.55deg, #FFBB89 0%, #7B6AE0 100%);",
      },
      width: {
        "80rem": "80rem",
      },
    },
  },
  plugins: [],
};
