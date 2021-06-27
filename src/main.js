import App from "./App.svelte";
import SITE_CONFIG from "../config";
import HMR from "@roxi/routify/hmr";

function updateMeta() {
    document.title = !SITE_CONFIG.TITLE ? document.title : SITE_CONFIG.TITLE;

    Object.defineProperty(window, "yukitoki", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: {
            toggleTheme: () => {
                const __root__ = document.querySelector("html");
                if (!__root__) return;
                const theme = window.localStorage.getItem("theme") ?? SITE_CONFIG.THEME ?? "light";
                const newTheme = theme === "dark" ? "light" : "dark";
                window.localStorage.setItem("theme", newTheme);

                __root__.className = window.localStorage.getItem("theme");
            },
            updateTheme() {
                const __root__ = document.querySelector("html");
                if (!__root__) return;
                __root__.className = window.localStorage.getItem("theme") === "dark" ? "dark" : "light";
            },
            setTheme(theme) {
                window.yukitoki.theme = theme;
            },
            get theme() {
                const theme = window.localStorage.getItem("theme") ?? SITE_CONFIG.THEME ?? "light";
                return ["dark", "light"].includes(theme) ? theme : "light";
            },
            set theme(theme) {
                theme = theme === "dark" ? "dark" : "light";
                window.localStorage.setItem("theme", theme);
                window.yukitoki.updateTheme();
            },
            get config() {
                return SITE_CONFIG;
            }
        }
    });

    // set the theme
    window.yukitoki.updateTheme();
}

updateMeta();

const app = HMR(
    App,
    {
        target: document.body
    },
    "routify-app"
);

export default app;
