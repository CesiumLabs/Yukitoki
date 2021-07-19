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
    INSTALL_COMMAND: "Install Yukitoki",
    HOME_LOGO: {
        TYPE: "TEXT", // "IMAGE" | "TEXT"
        VALUE: "Yukitoki"
    },
    DESCRIPTION: {
        TITLE: "About",
        VALUE: "A customizable website to view docs for your projects"
    },
    DESCRIPTION_LIST: {
        TITLE: "Why?",
        VALUE: ["Fast", "Easy to install", "Responsive", "Dark & Light mode", "Custom 404 page"]
    },
    FOOTER: {
        HEADER: "Yukitoki",
        DESCRIPTION: "Custom documentation viewing website"
    },
    LINKS: {
        string: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
        String: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
        number: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
        Number: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
        boolean: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
        Boolean: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
        symbol: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
        Symbol: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
        void: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
        Object: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
        object: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
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
        Buffer: "https://nodejs.org/dist/latest/docs/api/buffer.html#buffer_class_buffer",
        ReadableStream: "https://nodejs.org/dist/latest/docs/api/stream.html#stream_class_stream_readable",
        Readable: "https://nodejs.org/dist/latest/docs/api/stream.html#stream_class_stream_readable",
        ChildProcess: "https://nodejs.org/dist/latest/docs/api/child_process.html#child_process_class_childprocess",
        Worker: "https://nodejs.org/api/worker_threads.html#worker_threads_class_worker",
        MessagePort: "https://nodejs.org/api/worker_threads.html#worker_threads_class_messageport",
        IncomingMessage: "https://nodejs.org/dist/latest/docs/api/http.html#http_class_http_incomingmessage",
        m3u8Stream: "https://nodejs.org/dist/latest/docs/api/stream.html#stream_class_stream_readable",
        RequestInfo: "https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch",
        RequestInit: "https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch",
        RequestOptions: "https://nodejs.org/dist/latest/docs/api/http.html#http_http_request_options_callback",
        m3u8Options: "https://github.com/fent/node-m3u8stream#m3u8streamurl-options",
        CheerioRoot: "https://cheerio.js.org",
        Response: "https://developer.mozilla.org/en-US/docs/Web/API/Response",
        any: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any",
        CanvasRenderingContext2D: "https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D",
        Client: "https://discord.js.org/#/docs/main/stable/class/Client",
        Collection: "https://discord.js.org/#/docs/collection/master/class/Collection",
        Message: "https://discord.js.org/#/docs/main/stable/class/Message",
        VoiceChannel: "https://discord.js.org/#/docs/main/stable/class/VoiceChannel",
        StageChannel: "https://discord.js.org/#/docs/main/master/class/StageChannel",
        VoiceConnection: "https://discord.js.org/#/docs/main/stable/class/VoiceConnection",
        Snowflake: "https://discord.js.org/#/docs/main/stable/typedef/Snowflake",
        YTDLDownloadOptions: "https://github.com/fent/node-ytdl-core#ytdlurl-options",
        User: "https://discord.js.org/#/docs/main/stable/class/User",
        GuildResolvable: "https://discord.js.org/#/docs/main/stable/typedef/GuildResolvable",
        UserResolvable: "https://discord.js.org/#/docs/main/stable/typedef/UserResolvable",
        unknown: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type",
        Duplex: "https://nodejs.org/dist/latest/docs/api/stream.html#stream_class_stream_duplex",
        Guild: "https://discord.js.org/#/docs/main/stable/class/Guild"
    }
};

export default config;
