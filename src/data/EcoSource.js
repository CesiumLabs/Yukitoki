import DocsManager from "./DocsManager";

const blacklisted = new Set(["docs", "gh-pages"]);

export default new DocsManager({
    id: "eco",
    name: "Main",
    global: "Eco",
    repo: "DevSnowflake/quick.eco",
    defaultTag: "master",
    branchFilter: (branch) => !blacklisted.has(branch) && !branch.startsWith("dependabot/"),
    tagFilter: () => false
});
