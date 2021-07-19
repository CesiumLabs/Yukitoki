import DocsManager from "./DocsManager";

const blacklisted = new Set(["docs", "webpack", "v8", "supp-multi-db", "gh-pages"]);

export default new DocsManager({
    id: "quickmongo",
    name: "Main",
    global: "QuickMongo",
    repo: "DevSnowflake/quickmongo",
    defaultTag: "main",
    branchFilter: (branch) => !blacklisted.has(branch) && !branch.startsWith("dependabot/"),
    tagFilter: () => false
});
