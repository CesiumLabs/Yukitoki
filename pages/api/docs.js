const cache = new Map();

export default async (req, res) => {
    if (!req.query.source) return res.send("error");
    if (req.query.force === "true") cache.delete(req.query.source);
    if (cache.has(req.query.source)) return res.json(cache.get(req.query.source));

    try {
        const data = await fetch(req.query.source).then(res => res.json());

        cache.set(req.query.source, data);

        return res.json(data);
    } catch {
        res.send("error");
    }

}