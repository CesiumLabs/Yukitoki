import TypeLink from "./TypeLink";
import ParamsParser from "./ParamsParser";

export default function ParamsTable({ paramsData, withBorder, description }) {
    return (
        <div className={`patamsTable ${Boolean(withBorder) ? " border-l-2 hover:border-blue-500 transition" : ""}`}>
            {description ? (
                <h1 className="text-gray-200 text-lg px-2 py-2" dangerouslySetInnerHTML={{ __html: description }}></h1>
            ) : null}
            {paramsData?.length ? (
                <table className={`table-auto${Boolean(withBorder) ? " mx-2" : ""}`}>
                    <thead className="justify-between">
                        <tr className="bg-gray-800">
                            <th className="px-16 py-2">
                                <span className="text-gray-300">PARAMETER</span>
                            </th>
                            <th className="px-16 py-2">
                                <span className="text-gray-300">TYPE</span>
                            </th>
                            {paramsData.some((x) => !!x.optional) ? (
                                <th className="px-16 py-2">
                                    <span className="text-gray-300">OPTIONAL</span>
                                </th>
                            ) : paramsData.some((x) => !!x.default) ? (
                                <th className="px-16 py-2">
                                    <span className="text-gray-300">DEFAULT</span>
                                </th>
                            ) : null}
                            <th className="px-16 py-2">
                                <span className="text-gray-300">DESCRIPTION</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-600 text-white text-center">
                        {paramsData.map((m, i) => {
                            m.type = Array.isArray(m.type) ? m.type.flat(Infinity)[0] : m.type;

                            return (
                                <tr className="bg-gray-700" key={i}>
                                    <td>
                                        <span>{m.name}</span>
                                    </td>
                                    <td className="px-16 py-2 font-semibold">
                                        <span className="cursor-pointer">{<TypeLink type={m.type} />}</span>
                                    </td>
                                    {paramsData.some((x) => !!x.optional) ? (
                                        <td>
                                            <span>{m.optional ? "True" : "False"}</span>
                                        </td>
                                    ) : paramsData.some((x) => !!x.default) ? (
                                        <td>
                                            <span>{m.default}</span>
                                        </td>
                                    ) : null}
                                    <td className="px-16 py-2">
                                        <ParamsParser paramData={m.description} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : null}
        </div>
    );
}
