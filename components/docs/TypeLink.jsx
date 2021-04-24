import { PARAMS, LOCAL_TYPES } from "../../config";
import Link from "next/link";

export default function TypeLink({ type }) {
    const flatten = (t) => Array.isArray(t) ? t.flat(Infinity) : [t ?? "void"];
    const find = (m) => {
        if (PARAMS[m]) return { link: PARAMS[m], local: false };
        const findType = LOCAL_TYPES.find(x => x.name === m);
        if (findType) return { link: `${window.location.origin}/docs?path=${findType.path}/${findType.name}`, local: true };
    };

    return (
        <span>
            {
                flatten(type).map((m, i) => {
                    const found = find(m);
                    if (!found) return <a key={i} className={`${"text-gray-100 hover:text-gray-300"} transition`}>{m}</a>;

                    return (
                        !found.local ?
                            <a key={i} className={`${found ? "text-blue-400 hover:text-blue-300 cursor-pointer" : "text-gray-100 hover:text-gray-300"} transition`} href={found.link}>{m}</a>
                            :
                            <Link key={i} href={found.link}><a className={`${found ? "text-blue-400 hover:text-blue-300 cursor-pointer" : "text-gray-100 hover:text-gray-300"} transition`}>{m}</a></Link>
                    )
                })
            }
        </span>
    )
}
