const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      red: colors.red,
      yellow: colors.amber,
      blue: colors.blue,
      green: colors.emerald,
    },
    extend: {
      colors: {
        'vita-sunrise': '#FFDD35',
        'vita-purple': '#6256ec',
        'vita-teal': '#41f4d4',
        success: '#16BD9F',
        danger: '#FF6D90',
      },
      fontFamily: {
        sans: ['TT Hoves', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        18: '18rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
