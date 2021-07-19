import DocsManager from "./DocsManager";
import semver from "semver";

const blacklisted = new Set(["docs", "master"]);

export default new DocsManager({
    id: "soundcloud",
    name: "Main",
    global: "SoundCloud",
    repo: "DevSnowflake/soundcloud-scraper",
    defaultTag: "rewrite",
    branchFilter: (branch) => !blacklisted.has(branch) && !branch.startsWith("dependabot/"),
    tagFilter: (tag) => semver.gte(tag.replace("v", ""), "4.0.0")
});
