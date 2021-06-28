import semver from "semver";
import DocsManager from "./DocsManager";

const blacklisted = new Set(["old", "gh-pages", "docs"]);

export default new DocsManager({
    id: "main",
    name: "Main",
    global: "Yukitoki",
    repo: "Androz2091/discord-player",
    defaultTag: "master",
    branchFilter: (branch) => !blacklisted.has(branch) && !branch.startsWith("dependabot/"),
    tagFilter: (tag) => semver.gte(tag.replace(/^v/, ""), "4.1.4")
});
