/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./App.jsx"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F4EE",
        slate: "#708090",
        "slate-deep": "#4E5D6A",
        "slate-ink": "#5F6E7A",
        "slate-muted": "#B6C0C7",
        "slate-panel": "#667785",
        stone: "#A9A9A9",
        "stone-muted": "#C7C1B7",
        "stone-light": "#E8E1D8",
        sage: "#8A9A5B",
        "sage-deep": "#708049",
        "sage-pale": "#E6EAD6",
      },
      fontFamily: {
        display: ['"Lora"', '"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 45px rgba(78, 93, 106, 0.10)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      letterSpacing: {
        calm: "0.2em",
      },
    },
  },
  plugins: [],
};
