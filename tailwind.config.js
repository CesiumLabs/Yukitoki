module.exports = {
    purge: {
        enabled: true,
        content: ["./public/index.html", "./src/**/*.svelte", "./src/app/Markdown.js"]
    },
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                night: "#2f3136",
                blurple: {
                    200: "#EBEEFA",
                    300: "#C3CDEF",
                    400: "#9AABE5",
                    500: "#7289DA",
                    600: "#4A67CF",
                    700: "#304EB6",
                    800: "#253C8E",
                    900: "#1B2B65"
                }
            }
        },
    },
    variants: {
        extend: {}
    },
    plugins: [require("@tailwindcss/forms")({ strategy: "class" }), require("@tailwindcss/typography")]
};
