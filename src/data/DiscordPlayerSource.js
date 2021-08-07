import DocsManager from "./DocsManager";

const blacklisted = new Set(["docs", "gh-pages"]);

export default new DocsManager({
    id: "discord-player",
    name: "Main",
    global: "Player",
    repo: "Androz2091/discord-player",
    defaultTag: "master",
    docsBranch: "docs",
    branchFilter: (branch) => !blacklisted.has(branch) && !branch.startsWith("dependabot/"),
    tagFilter: () => false
});
