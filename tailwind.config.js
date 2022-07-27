/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  important: true,
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1abc9c",
          secondary: "#40407a",
          accent: "#8e44ad",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "cupcake",
    ],
  },
  plugins: [require("daisyui")],
}
