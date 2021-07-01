class DocsStore {
    constructor(manager) {
        this.manager = manager;
        this._docs = [];
    }

    get docs() {
        if (this._docs.length) return this._docs;
        return window.sessionStorage.getItem("__docs__") ? JSON.parse(window.sessionStorage.getItem("__docs__")) : this._docs;
    }

    set docs(docs) {
        this._docs = docs;
    }

    async fetchDocs() {
        if (this.docs.length) return this.docs;
        await this.manager.fetchTags();
        const data = await Promise.all(
            this.manager.tags.map(async (m) => {
                const documentation = await this.manager.fetchDocs(m);
                documentation.links = this.links;
                documentation.classes ??= [];
                documentation.typedefs ??= [];
                documentation.externals ??= [];
                documentation.classes.sort((a, b) => a.name.localeCompare(b.name));
                documentation.typedefs.sort((a, b) => a.name.localeCompare(b.name));
                documentation.global = this.manager.global;
                documentation.source = this.manager.source;
                documentation.id = this.manager.id;
                documentation.tag = m;

                for (const c of documentation.classes) {
                    if (c.props) {
                        c.props.sort((a, b) => a.name.localeCompare(b.name));
                    }
                    if (c.methods) {
                        c.methods.sort((a, b) => a.name.localeCompare(b.name));
                    }
                    if (c.events) {
                        c.events.sort((a, b) => a.name.localeCompare(b.name));
                    }
                }

                for (const x of documentation.externals) {
                    documentation.links[x.name] = x.see[0].replace(/\{@link\s+(.+?)\s*\}/i, "$1");
                }

                for (const c of documentation.classes) {
                    documentation.links[c.name] = { name: "docs-tag-class", params: { class: c.name } };
                }

                for (const t of documentation.typedefs) {
                    documentation.links[t.name] = { name: "docs-tag-typedef", params: { typedef: t.name } };
                }

                return documentation;
            })
        );

        window.sessionStorage.setItem("__docs__", JSON.stringify(data));
        this.docs = data;

        return this.docs;
    }

    get links() {
        return {
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
        };
    }
}

export default DocsStore;
