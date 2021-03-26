module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        spartan: 'Spartan',
        inter: 'Inter',
      },
      colors: {
        'dark-gray': '#282A34',
      },
      height: {
        fullnavbar: 'calc(100vh - 64px)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
