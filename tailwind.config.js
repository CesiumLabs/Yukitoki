const production = !process.env.ROLLUP_WATCH;

module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [
  ],
  darkMode: "class",
  purge: {
    content: [
      "./src/**/*.svelte",

    ],
    enabled: production
  },
};