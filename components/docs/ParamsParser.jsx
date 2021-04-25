import { Converter } from "showdown";

const converter = new Converter({
    tables: true,
    ghCodeBlocks: true,
    emoji: true,
    ghCompatibleHeaderId: true
});

export default function ParamsParser({ paramData, paramsData }) {
    const data = paramData ?? paramsData ?? "**Documentation Missing**";
    const html = converter.makeHtml(data);

    return (
        <div className="text-white" dangerouslySetInnerHTML={{ __html: html }}></div>
    )
}
