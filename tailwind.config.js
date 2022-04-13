module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#15803D',
        'primary-light': '#c7ffdc',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
