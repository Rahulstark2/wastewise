module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, 
  theme: {
    extend: {
      colors: {
        'custom-light-green': '#E0EBCB',
        'custom-white': '#FFFFFF',
        'custom-black':'0F1035',
        'custom-olive-green':'#9DCD4F',
        'custom-purple':'#6049BC',
        'custom-blacky':'#252F40',
        'custom-deep-purple':'#664FCD',
        'custom-deep-green': '#123800'

      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
