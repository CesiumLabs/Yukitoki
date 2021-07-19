import DocsManager from "./DocsManager";

const blacklisted = new Set(["docs"]);

export default new DocsManager({
    id: "yukitoki",
    name: "Main",
    global: "Yukitoki",
    repo: "DevSnowflake/yukitoki-docs",
    defaultTag: "main",
    docsBranch: "docs",
    branchFilter: (branch) => !blacklisted.has(branch) && !branch.startsWith("dependabot/")
});
