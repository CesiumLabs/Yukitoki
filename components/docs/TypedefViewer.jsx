import ParamsTable from "./ParamsTable";
import { PARAMS } from "../../config";

export default function TypedefViewer({ data }) {
    return (
        <section>
            <div>
                <h1 className="text-white text-3xl font-bold">{data.data.name}</h1>
                {data.data.description ? (
                    <div className="text-white mt-0" dangerouslySetInnerHTML={{ __html: data.data.description }}></div>
                ) : null}
            </div>
            <div>
                {data.data.type ? (
                    <div>
                        <h1 className="text-gray-200 text-2xl font-semibold pt-10 pb-2">Types</h1>
                        <a
                            className="text-blue-400 font-semibold text-lg cursor-pointer hover:text-blue-300"
                            href={PARAMS[data.data.type]}
                        >
                            {data.data.type}
                        </a>
                    </div>
                ) : null}
                {data.data.props?.length ? (
                    <div class="py-5">
                        <ParamsTable paramsData={data.data.props} />
                    </div>
                ) : null}
            </div>
        </section>
    );
}
