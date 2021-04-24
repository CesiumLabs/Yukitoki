export default function Viewer({ data }) {
    return !data.jsx ? (
        <div dangerouslySetInnerHTML={{ __html: data.data }}></div>
    ) : (
        <div>
            <div className="flex items-center justify-center">
                <h1 className="text-white">{data.data.name}</h1>
                {data.data.extends && data.data.extends.length ? (
                    <span className="ml-3 mb-7 px-4 shadow-md no-underline rounded-full bg-blue-600 text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">
                        extends {data.data.extends.flat(Infinity)[0]}
                    </span>
                ) : null}
            </div>
            {data.data.description ? (
                <div className="text-white p-0" dangerouslySetInnerHTML={{ __html: data.data.description }}></div>
            ) : null}
        </div>
    );
}
