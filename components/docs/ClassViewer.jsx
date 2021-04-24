import ParamsTable from "./ParamsTable";

export default function ClassViewer({ data }) {
    const Props = [
        {
            name: "Properties",
            data: data.data.props
        },
        {
            name: "Methods",
            data: data.data.methods
        },
        {
            name: "Events",
            data: data.data.events
        }
    ];
    const hasProps = Props.filter((x) => !x).length !== Props.length;
    const charCode = (str) =>
        str
            .toUpperCase()
            .split("")
            .map((m) => m.charCodeAt(0))
            .reduce((a, b) => a + b, 0);

    return (
        <section>
            <div>
                <h1 className="text-white text-3xl font-bold">
                    new {data.data.construct.name}({data.data.construct.params?.map((m) => m.name).join(", ")})
                </h1>
                {data.data.description ? (
                    <div
                        className="text-white mt-0"
                        dangerouslySetInnerHTML={{ __html: data.data.construct.description }}
                    ></div>
                ) : null}
            </div>
            <div>
                {data.data.construct.params?.length ? (
                    <div class="py-5">
                        <ParamsTable paramsData={data.data.construct.params} />
                    </div>
                ) : null}
                {hasProps ? (
                    <div className="grid grid-cols-3 gap-4 py-10">
                        {Props.filter((x) => !!x.data).map((m) => {
                            return (
                                <div>
                                    <span className="title font-semibold text-gray-200">{m.name}</span>
                                    <div className="flex flex-col">
                                        {m.data
                                            .sort((a, b) => charCode(a.name) - charCode(b.name))
                                            .map((m) => {
                                                return (
                                                    <div className="prop">
                                                        <span className="title text-gray-200 hover:text-gray-100 border-l-2 border-gray-400 hover:border-blue-500">
                                                            <a className="cursor-pointer px-2">{m.name}</a>
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : null}

                <div className="viewer">
                    {hasProps
                        ? Props.filter((x) => !!x.data).map((m) => {
                              return (
                                  <div>
                                      <h1 className="title font-semibold text-gray-200 text-3xl">{m.name}</h1>
                                      <div className="flex flex-col py-2">
                                          {m.data
                                              .sort((a, b) => charCode(a.name) - charCode(b.name))
                                              .map((n) => {
                                                  return (
                                                      <div className="prop py-3 text-gray-200 px-2">
                                                          <h1 className="cursor-pointer text-xl hover:text-blue-500">{`${
                                                              m.name === "Events" ? "" : "."
                                                          }${n.name}${
                                                              m.name === "Methods"
                                                                  ? `(${n.params?.map((m) => m.name).join(", ") || ""})`
                                                                  : ""
                                                          }`}</h1>
                                                          <ParamsTable
                                                              paramsData={n.params || []}
                                                              description={n.description}
                                                              withBorder="true"
                                                          />
                                                      </div>
                                                  );
                                              })}
                                      </div>
                                  </div>
                              );
                          })
                        : null}
                </div>
            </div>
        </section>
    );
}
