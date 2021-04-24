import { PARAMS } from "../../config";

export default function ParamsTable({ paramsData, withBorder, description }) { 
    return (
        <div className={`patamsTable ${Boolean(withBorder) ? " border-l-2 hover:border-blue-500 transition" : ""}`}>
            {description ? <h1 className="text-gray-200 text-lg px-2 py-2" dangerouslySetInnerHTML={{ __html: description }}></h1> : null}
            {
                paramsData?.length ? (<table class={`min-w-full table-auto${Boolean(withBorder) ? " mx-2" : ""}`}>
                    <thead class="justify-between">
                        <tr class="bg-gray-800">
                            <th class="px-16 py-2">
                                <span class="text-gray-300">PARAMETER</span>
                            </th>
                            <th class="px-16 py-2">
                                <span class="text-gray-300">TYPE</span>
                            </th>
                            {
                                paramsData.some(x => !!x.optional) ? (
                                    <th class="px-16 py-2">
                                        <span class="text-gray-300">OPTIONAL</span>
                                    </th>
                                ) : paramsData.some(x => !!x.default) ? (
                                    <th class="px-16 py-2">
                                            <span class="text-gray-300">DEFAULT</span>
                                    </th>
                                ) : null
                            }
                            <th class="px-16 py-2">
                                <span class="text-gray-300">DESCRIPTION</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-gray-600 text-white text-center">
                        {
                            paramsData.map((m, i) => {
                                m.type = Array.isArray(m.type) ? m.type.flat(Infinity)[0] : m.type;
                                
                                return (<tr class="bg-gray-700" key={i}>
                                    <td>
                                        <span>{m.name}</span>
                                    </td>
                                    <td class="px-16 py-2 font-semibold">
                                        <span className="cursor-pointer">
                                            {PARAMS[m.type] ? <a className="text-blue-400 hover:text-blue-300 transition" href={PARAMS[m.type]}>{m.type}</a> : m.type}
                                        </span>
                                    </td>
                                    {
                                        paramsData.some(x => !!x.optional) ? (
                                            <td>
                                                <span>{m.optional ? "True" : "False"}</span>
                                            </td>
                                        ) : paramsData.some(x => !!x.default) ? (
                                            <td>
                                                <span>{m.default}</span>
                                            </td>
                                        ) : null
                                    }
                                    <td class="px-16 py-2">
                                        <span dangerouslySetInnerHTML={{ __html: m.description || "<b>Documentation Missing</b>" }}></span>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>) : null
            }
        </div>
    )
}
