import ClassViewer from "./ClassViewer";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import { useEffect } from "react";
import TypedefViewer from "./TypedefViewer";

export default function Viewer({ data }) {
    console.log(data);

    function highlight() {
        document.querySelectorAll("pre code").forEach((el) => {
            hljs.highlightBlock(el);
        });
    }

    useEffect(() => highlight());

    if (!data.jsx)
        return (
            <div id="docs-content" className="text-white prose">
                <div dangerouslySetInnerHTML={{ __html: data.data }}></div>
            </div>
        );

    return data.raw.head === "classes" ? <ClassViewer data={data} /> : <TypedefViewer data={data} />;
}
