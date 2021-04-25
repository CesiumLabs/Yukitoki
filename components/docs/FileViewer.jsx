import hljs from "highlight.js";
import { useEffect } from "react";

export default function FileViewer({ content }) {
    function highlight() {
        document.querySelectorAll("pre code").forEach((el) => {
            hljs.highlightBlock(el);
        });
    }

    useEffect(() => highlight());

    return (
        <div id="docs-content" className="text-white prose">
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
    );
}
