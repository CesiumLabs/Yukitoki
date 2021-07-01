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
        VALUE: "A customizable website to view docs for your projects"
    },
    FOOTER: {
        HEADER: "Yukitoki",
        DESCRIPTION: "Custom documentation viewing website"
    },
    LINKS: {
        string: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
        number: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
        bigint: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt",
        boolean: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
        symbol: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
        void: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
        Object: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
        Function: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function",
        function: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function",
        Array: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
        Set: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
        Map: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
        Date: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date",
        RegExp: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp",
        Promise: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
        Error: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error",
        EventEmitter: "https://nodejs.org/dist/latest/docs/api/events.html#events_class_eventemitter",
        Timeout: "https://nodejs.org/dist/latest/docs/api/timers.html#timers_class_timeout",
        Immediate: "https://nodejs.org/dist/latest/docs/api/timers.html#timers_class_immediate",
        Buffer: "https://nodejs.org/dist/latest/docs/api/buffer.html#buffer_class_buffer",
        ReadableStream: "https://nodejs.org/dist/latest/docs/api/stream.html#stream_class_stream_readable",
        ChildProcess: "https://nodejs.org/dist/latest/docs/api/child_process.html#child_process_class_childprocess",
        Worker: "https://nodejs.org/api/worker_threads.html#worker_threads_class_worker",
        MessagePort: "https://nodejs.org/api/worker_threads.html#worker_threads_class_messageport"
    }
};

export default config;