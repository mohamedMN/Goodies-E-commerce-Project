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
          primary: "#232527",

          secondary: "#B9B4C7",

          accent: "#1b262c",

          neutral: "#FAF0E6",

          "base-100": "#6d6d6d",

          info: "#93B1A6",

          success: "#4BB543",

          warning: "#fbbd23",

          error: "#b34",
        },
        darktheme:{
          primary: "#B9B4C7",
  
          secondary: "#232527",
  
          accent: "#EEEEEE",
  
          neutral: "#FAF0E6",
  
          "base-100": "#1b262c",
  
          info: "#93B1A6",
  
          success: "#4BB543",
  
          warning: "#fbbd23",
  
          error: "#b34",

        }
      },
    ],
  },
};
