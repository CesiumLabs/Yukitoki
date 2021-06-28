import semver from "semver";

// Discord.js styled docs

class DocsManager {
    constructor(docsOptions) {
        if (!docsOptions) throw new Error("Invalid docs options");

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
                const [branches, tags] = data;

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
        return await fetch(`https://raw.githubusercontent.com/${this.repo}/docs/${tag}.json`).then((res) => {
            if (!res.ok) throw new Error("Could not fetch docs data");
            return res.json();
        });
    }
}

export default DocsManager;
