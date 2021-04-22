const downloads = (a) => `https://api.npmjs.org/downloads/range/2013-08-21:2100-08-21/${a}`;
const stats = (a) => `https://api.github.com/repos/${a}`;
const contributors = (a) => `${stats(a)}/stats/contributors`;

const cache = new Map();

// setInterval(() => cache.clear(), 86400000);

export default async (req, res) => {
    if (cache.has(req.query.name)) return res.json(cache.get(req.query.name));

    try {
        const dl = await fetch(downloads(req.query.name)).then(res => res.json());
        const stat = await fetch(stats(req.query.repo)).then(res => res.json());
        const contrib = await fetch(contributors(req.query.repo)).then(res => res.json());
        const data = { downloads: dl.downloads.reduce((a, c) => a + c.downloads, 0), stars: stat.stargazers_count, contributors: contrib.length };

        for (const item in data) {
            if (typeof data[item] !== "number") return res.send("error");
        }

        cache.set(req.query.name, data);

        return res.json(data);
    } catch {
        res.send("error");
    }

}