import DocsManager from "./DocsManager";

const blacklisted = new Set(["docs", "master"]);

export default new DocsManager({
    id: "canvacord",
    name: "Main",
    global: "Canvacord",
    repo: "DevSnowflake/canvacord",
    defaultTag: "main",
    branchFilter: (branch) => !blacklisted.has(branch) && !branch.startsWith("dependabot/"),
    tagFilter: () => false
});
