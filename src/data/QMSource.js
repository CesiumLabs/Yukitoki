import DocsManager from "./DocsManager";

const whitelisted = new Set(["main", "v4"]);

export default new DocsManager({
    id: "quickmongo",
    name: "Main",
    global: "QuickMongo",
    repo: "DevSnowflake/quickmongo",
    defaultTag: "main",
    branchFilter: (branch) => whitelisted.has(branch) && !branch.startsWith("dependabot/"),
    tagFilter: () => false
});
