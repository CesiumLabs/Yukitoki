const config = {
    TITLE: "Yukitoki", // this will dynamically update the title
    SITE_NAME: "Yukitoki",
    THEME: "light", // "light" | "dark"
    NAV: {
        ICON: {
            TYPE: "TEXT", // "TEXT" | "IMAGE"
            VALUE: "Yukitoki", // IMAGE path or TEXT
            HREF: "/" // href
        },
        BUTTONS: [
            {
                label: "Home",
                path: "/",
                newPage: false
            },
            {
                label: "Documentation",
                path: "/docs",
                newPage: false
            },
            {
                label: "Discord",
                path: "https://discord.gg/uqB8kxh",
                newPage: true
            },
            {
                label: "GitHub",
                path: "https://github.com/DevSnowflake/Yukitoki",
                newPage: true
            }
        ]
    },
    INSTALL_COMMAND: "install Yukitoki",
    HOME_LOGO: {
        TYPE: "TEXT", // "IMAGE" | "TEXT"
        VALUE: "Yukitoki"
    },
    DESCRIPTION: {
        TITLE: "About",
        VALUE: "A customizable website to view docs for Snowflake Studio ❄'s projects"
    },
    FOOTER: {
        HEADER: "Yukitoki",
        DESCRIPTION: "Custom documentation viewing website"
    }
};

export default config;