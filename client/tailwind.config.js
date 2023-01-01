module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f57f9d",
        secondary: "#9CB2AA",
        tertiary: "#dcfbfc",
        bgprimary: "#FAFCFF",
        bgsecondary: "#fcf0f3",
      },
      fontFamily: {
        roboto: ["Roboto", "ui-sans-serif"],
        poppins: ["Poppins", "ui-sans-serif"],
        lato: ["Lato", "SFMono-ui-monospace"],
      },
    },
  },
  plugins: [],
};
