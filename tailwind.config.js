/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,html,css}",
    "./components/**/*.{js,ts,jsx,tsx,html,css}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {},
    container: { center: true },
  },
  plugins: [require("flowbite/plugin")],
};
