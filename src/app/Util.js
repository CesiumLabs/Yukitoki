export default class Util {
    static getPath(prop, docs, meta) {
        const currentBranch = docs.find((x) => x.tag === meta.tag);
        let scrollTo;
        if (prop.includes("#")) [prop, scrollTo] = prop.split("#");

        if (prop in currentBranch.links) {
            const item = currentBranch.links[prop];
            if (typeof item === "string") return { text: prop, link: item, external: true };
            if (item.name === "docs-tag-typedef") {
                return { text: item.params.typedef, link: `/docs/${meta.source}/${meta.tag}/typedef/${item.params.typedef}`, external: false };
            }

            if (item.name === "docs-tag-class") {
                return { text: item.params.class, link: `/docs/${meta.source}/${meta.tag}/class/${item.params.class}${scrollTo ? `?scrollTo=${scrollTo}` : ""}`, external: false };
            }
        }

        return { text: prop, link: null, external: false };
    }
}
