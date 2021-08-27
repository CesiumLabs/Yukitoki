import DocsManager from "./DocsManager";

const blacklisted = new Set(["main"]);

export default new DocsManager({
    id: "quickmongo",
    name: "Main",
    global: "QuickMongo",
    repo: "DevSnowflake/quickmongo",
    defaultTag: "main",
    branchFilter: (branch) => blacklisted.has(branch) && !branch.startsWith("dependabot/"),
    tagFilter: () => false
});
