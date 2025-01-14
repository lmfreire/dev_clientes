/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "Poppins, sans-serif",
      },
      keyframes: {
        slideIn: {
          from: {width: 0},
          to: {width: '--radix-collapsible-content-width'}
        },
        slideOut: {
          from: {width: '--radix-collapsible-content-width'},
          to: {width: 0}
        }
      },
      animation: {
        slideIn: 'slideIn 0.28s',
        slideOut: 'slideOut 0.28s'
      }
    },
  },
  plugins: [],
}

