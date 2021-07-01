import DocsManager from "./DocsManager";

const blacklisted = new Set(["docs"]);

export default new DocsManager({
    id: "main",
    name: "Main",
    global: "Yukitoki",
    repo: "DevSnowflake/yukitoki-docs",
    defaultTag: "main",
    branchFilter: (branch) => !blacklisted.has(branch)
});
