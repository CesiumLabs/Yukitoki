import { PARAMS } from "../../config";

export default function TypeLink({ type }) {
    const flatten = (t) => Array.isArray(t) ? t.flat(Infinity) : [t ?? "void"];

    return (
        <span>
            {
                flatten(type).map((m, i) => {
                    return <a key={i} className={`${PARAMS[m] ? "text-blue-400 hover:text-blue-300 cursor-pointer" : "text-gray-100 hover:text-gray-300"} transition`} href={PARAMS[m]}>{m}</a>
                })
            }
        </span>
    )
}
