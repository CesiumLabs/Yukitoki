export default function Special({ prop }) {
    const types = {
        readonly: "read-only",
        static: "static"
    };

    const possible = ["static", "readonly", "private", "abstract", "deprecated"];

    return (
        <>
            {possible.map((m, i) => {
                return m === prop.scope || prop[m] ? (
                    <span
                        key={i}
                        className="bg-blue-500 text-white font-semibold text-xs uppercase px-2 py-1 rounded ml-3 cursor-help"
                        title={`This prop is ${types[m]}.`}
                    >
                        {types[m]}
                    </span>
                ) : null;
            })}
        </>
    );
}
