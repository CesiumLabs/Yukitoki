import Fuse from "fuse.js";

export default function Search(query, docs, meta) {
    docs = docs.find((x) => x.tag === meta.tag);
    const props = [];

    docs.classes?.forEach((cls) => {
        props.push({
            type: "class",
            name: cls.construct?.name || cls.name,
            text: cls.construct?.name || cls.name,
            path: `/docs/${meta.source}/${meta.tag}/class/${cls.name}`
        });

        for (const name of ["methods", "events", "props"]) {
            cls[name]?.forEach((pn) => {
                props.push({
                    type: name,
                    name: pn.name,
                    text: `${cls.construct?.name || cls.name}#${name.substr(0, 1)}-${pn.name}`,
                    path: `/docs/${meta.source}/${meta.tag}/class/${cls.name}?scrollTo=${pn.name}`
                });
            });
        }
    });

    docs.typedefs?.forEach((typedef) => {
        props.push({
            type: "typedef",
            name: typedef.name,
            text: typedef.name,
            path: `/docs/${meta.source}/${meta.tag}/typedef/${typedef.name}`
        });
    });

    const fuse = new Fuse(props, {
        shouldSort: true,
        threshold: 0.5,
        location: 0,
        distance: 80,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["name"]
    });

    const result = fuse.search(query);

    return result.map((m) => m.item);
}
