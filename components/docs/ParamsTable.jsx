import TypeLink from "./TypeLink";
import ParamsParser from "./ParamsParser";

export default function ParamsTable({ paramsData, withBorder, description }) {
    const dispOptional = paramsData.some((x) => !!x.optional);
    const dispDefault = paramsData.some((x) => !!x.default);

    return (
        <div className={`${Boolean(withBorder) ? "border-l-2 hover:border-blue-500 transition" : ""}`} id="paramsTable">
            {description ? (
                <h1 className="text-gray-200 text-lg mx-3 my-2" dangerouslySetInnerHTML={{ __html: description }}></h1>
            ) : null}
            {paramsData?.length ? (
                <div className={`overflow-x-auto ${Boolean(withBorder) ? " mx-3" : ""}`}>
                    <table className="table-auto">
                        <thead className="bg-gray-800 text-gray-300">
                            <tr>
                                <th>
                                    PARAMETER
                                </th>
                                <th>
                                    TYPE
                                </th>
                                { dispOptional ? (
                                    <th>
                                        OPTIONAL
                                    </th>
                                ) : dispDefault ? (
                                    <th>
                                        DEFAULT
                                    </th>
                                ) : null}
                                <th>
                                    DESCRIPTION
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-700 text-white text-center">
                            {paramsData.map((m, i) => {
                                m.type = Array.isArray(m.type)
                                    ? m.type.flat(Infinity).map((n, j) => <TypeLink key={j} type={n} />)
                                    : m.type;

                                return (
                                    <tr key={i}>
                                        <td>
                                            {m.name}
                                        </td>
                                        <td className="px-16 py-2 font-semibold">
                                            {m.type}
                                        </td>
                                        { dispOptional ? (
                                            <td>
                                                {m.optional ? "True" : "False"}
                                            </td>
                                        ) : dispDefault ? (
                                            <td>
                                                {m.default}
                                            </td>
                                        ) : null}
                                        <td>
                                            <ParamsParser paramData={m.description} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : null}
        </div>
    );
}
