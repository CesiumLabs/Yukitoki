module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#222',
            a: {
              color: '#3182ce',
              'text-decoration': 'none',
              '&:hover': {
                color: '#3162ce',
              },
            },
            'h1, h2, h3, h4, h5, h6, p, code, strong': {
              color: '#ffffff',
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
