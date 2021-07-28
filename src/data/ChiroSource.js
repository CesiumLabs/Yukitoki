import DocsManager from "./DocsManager";

const blacklisted = new Set(["docs"]);

export default new DocsManager({
    id: "chiro",
    name: "Main",
    global: "Chiro",
    repo: "DevSnowflake/chiro.js",
    defaultTag: "main",
    branchFilter: (branch) => !blacklisted.has(branch) && !branch.startsWith("dependabot/"),
    tagFilter: () => false
});
