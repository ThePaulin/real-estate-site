/** @type {import('tailwindcss').Config} */

function useOpacityValue(cssVariable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${cssVariable}))`;
    }
    return `rgb(${cssVariable}) / ${opacityValue}`;
  };
}

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary-color))",
        secondary: "rgb(var(--secondary-color))",
        tertiary: "rgb(var(--tertiary-color))",
        accent: "rgb(var(--accent-color))",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        tablet: "40em",
        // 640px
        laptop: "64em",
        // 1024px
        desktop: "80em",
        // 1280px
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-font-inter"),
    require("@headlessui/tailwindcss"),
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
  ],
};
