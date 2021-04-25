import ClassViewer from "./ClassViewer";
import TypedefViewer from "./TypedefViewer";
import FileViewer from "./FileViewer";
import "highlight.js/styles/monokai-sublime.css";
import { useEffect } from "react";
import hljs from "highlight.js";

export default function Viewer({ data }) {
    function highlight() {
        document.querySelectorAll("pre code").forEach((el) => {
            hljs.highlightBlock(el);
        });
    }

    useEffect(() => highlight());

    if (!data.jsx) return <FileViewer content={data.data} />;

    return data.raw.head === "classes" ? <ClassViewer data={data} /> : <TypedefViewer data={data} />;
}
