import ParamsTable from "./ParamsTable";
import { PARAMS } from "../../config";
import ParamsParser from "./ParamsParser";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GITHUB_LINK, BRANCH } from "../../config";

const constructLink = (path, file, line) => `${GITHUB_LINK}/blob/${BRANCH}/${path}/${file}#L${line}`;

export default function TypedefViewer({ data }) {
    return (
        <section>
            <div>
                <h1 className="text-white text-3xl font-bold">{data.data.name}</h1>
                <a class="float-right" href={constructLink(data.data.meta.path, data.data.meta.file, data.data.meta.line)}>
                    <FontAwesomeIcon icon={faCode} class="h-7 w-7 text-blue-500 hover:text-blue-600 cursor-pointer" />
                </a>
                {data.data.description ? <ParamsParser className="text-white mt-0" paramData={data.data.description} /> : null}
            </div>
            <div>
                {data.data.type ? (
                    <div>
                        <h1 className="text-gray-200 text-2xl font-semibold pt-10 pb-2">Types</h1>
                        <a className="text-blue-400 font-semibold text-lg cursor-pointer hover:text-blue-300" href={PARAMS[data.data.type]}>
                            {data.data.type}
                        </a>
                    </div>
                ) : null}
                {data.data.props?.length ? (
                    <div className="py-5">
                        <ParamsTable paramsData={data.data.props} />
                    </div>
                ) : null}
            </div>
        </section>
    );
}
