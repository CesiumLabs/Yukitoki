import CONFIG from "../../config";

class DocsStore {
    constructor(manager) {
        this.manager = manager;
        this._docs = [];
    }

    get docs() {
        if (this._docs.length) return this._docs;
        return window.sessionStorage.getItem(`docs-${this.manager.id}`) ? JSON.parse(window.sessionStorage.getItem(`docs-${this.manager.id}`)) : this._docs;
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
                documentation.defaultFile = this.manager.defaultFile;

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

        window.sessionStorage.setItem(`docs-${this.manager.id}`, JSON.stringify(data));
        this.docs = data;

        return this.docs;
    }

    get links() {
        return CONFIG.LINKS;
    }
}

export default DocsStore;
