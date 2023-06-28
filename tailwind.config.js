/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Define your custom colors here
        primary: '#4DBD3D',
        primaryText: '#3FAE2E',
        primaryButton: '#3FAE2E',
        primaryButtonHover: '#3FAE2E',
        primaryHover: '#3FAE2E',
        primaryDark: '#35952B',
        primaryLight: '#84E45E',
      },
    },
  },
  plugins: [],
};
