/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        roboto: ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#5C8374",

          secondary: "#040D12",

          accent: "#2F7777",

          neutral: "#B9B4C7",

          "base-100": "#5C8374",

          info: "#93B1A6",

          success: "#4BB543",

          warning: "#fbbd23",

          error: "#f87272",
        },
      },
    ],
  },
};
