import semver from "semver";

// Discord.js styled docs

class DocsManager {
    constructor(docsOptions) {
        if (!docsOptions) throw new Error("Invalid docs options");

        this.docsBranch = docsOptions.docsBranch ?? "docs";
        this.id = docsOptions.id;
        this.name = docsOptions.name;
        this.global = docsOptions.global;
        this.repo = docsOptions.repo;
        this.defaultTag = docsOptions.defaultTag ?? "master";
        this.defaultFile = {
            category: docsOptions.defaultFile?.category ?? "general",
            id: docsOptions.defaultFile?.id ?? "welcome"
        };
        this.source = docsOptions.source ?? `https://github.com/${this.repo}/blob`;
        this.branchFilter = docsOptions.branchFilter ?? ((b) => b !== "master");
        this.tagFilter = docsOptions.tagFilter ?? (() => true);
        this.tags = null;
        this.recentTag = null;
    }

    async fetchTags() {
        if (this.tags) return this.tags;

        return await Promise.all([fetch(`https://api.github.com/repos/${this.repo}/branches`).then((r) => r.json()), fetch(`https://api.github.com/repos/${this.repo}/tags`).then((r) => r.json())])
            .catch((e) => {
                if (localStorage.getItem(`src-${this.id}`)) {
                    console.error(e);
                    const data = JSON.parse(localStorage.getItem(`src-${this.id}`));
                    return [data.branches, data.tags];
                }

                throw e;
            })
            .then((data) => {
                let [branches, tags] = data;
                if (branches == null) branches = [];
                if (tags == null) tags = [];

                this.tags = [this.defaultTag];
                localStorage.setItem(`src-${this.id}`, JSON.stringify({ branches, tags }));

                for (const branch of branches) {
                    if (branch.name !== this.defaultTag && this.branchFilter(branch.name)) {
                        this.tags.push(branch.name);
                    }
                }

                const latestPatches = {};

                for (const tag of tags) {
                    if (semver.valid(tag.name)) {
                        const majorMinor = `${semver.major(tag.name)}.${semver.minor(tag.name)}`;
                        const patch = semver.patch(tag.name);
                        if (patch < latestPatches[majorMinor]) {
                            continue;
                        }
                        latestPatches[majorMinor] = patch;
                    }
                }

                for (const tag of tags) {
                    if (tag.name === this.defaultTag) continue;
                    if (!this.tagFilter(tag.name)) continue;

                    if (semver.valid(tag.name)) {
                        const majorMinor = `${semver.major(tag.name)}.${semver.minor(tag.name)}`;
                        const patch = semver.patch(tag.name);
                        if (patch < latestPatches[majorMinor]) continue;
                    }

                    this.tags.push(tag.name);
                }

                return this.tags;
            });
    }

    async fetchDocs(tag) {
        return await fetch(`https://raw.githubusercontent.com/${this.repo}/${this.docsBranch}/${tag}.json`).then(async (res) => {
            if (!res.ok && !window.localStorage.getItem(`docs-${tag}`)) throw new Error("Could not fetch docs data");
            const doc = res.ok ? await res.json() : JSON.parse(window.localStorage.getItem(`docs-${tag}`));
            window.localStorage.setItem(`docs-${tag}`, JSON.stringify(doc));
            return doc;
        });
    }
}

export default DocsManager;
