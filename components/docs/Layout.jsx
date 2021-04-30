import { useState, useEffect } from "react";
import { Converter } from "showdown";
import Viewer from "./Viewer";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import { useRouter } from "next/router";
import ErrorPage from "./Error";
import { UTILS } from "../../config";
import Link from "next/link";

const params = ["classes", "typedefs"];
const mdconv = new Converter({
    tables: true,
    ghCodeBlocks: true,
    emoji: true,
    ghCompatibleHeaderId: true
});

const makeHTML = (md) => mdconv.makeHtml(md);

export default function DocsLayout({ docs }) {
    const router = useRouter();
    const path = router.query.path || new URLSearchParams(window.location.search).get("path") || "";
    if (!docs) return <ErrorPage />;

    const [docsContent, setDocsContent] = useState({ jsx: false, data: null, path: null });
    const data = Object.keys(docs)
        .filter((a) => params.includes(a))
        .map((m) => ({ name: m, data: docs[m] }));

    const custom = Object.values(docs.custom);

    if (!path) {
        const def = Object.values(custom[0].files)[0];
        window.location.href += `?path=${def.path.split("/").slice(1).join("/").split(".").shift()}`;
    } else {
        if (path !== docsContent.path) {
            const [name, fileName] = path.split("/");
            const nc = ["classes", "typedefs"];
            if (nc.includes(name)) {
                const file = docs[name].find((f) => f.name === fileName);
                if (!file) return <ErrorPage path={`/docs?path=${path}`} />;
                file.head = name;
                navigate(file.name, null, file);
            } else {
                if (
                    !custom.find((x) => x.files[fileName] !== undefined) ||
                    !custom.find((x) => x.files[fileName] !== undefined).files[fileName]
                )
                    return <ErrorPage path={`/docs?path=${path}`} />;

                navigate(fileName, null);
            }
        }
    }

    useEffect(() => {
        highlight();
    });

    const handler = (e) => e.preventDefault();

    function navigate(navigateTo, e, notCustom = false) {
        if (e) handler(e);

        if (!notCustom) {
            const loc = custom.find((x) => x.files[navigateTo] !== undefined);
            const file = loc.files[navigateTo];

            if (file.type === "js") file.content = `\`\`\`js\n${file.content}\`\`\``;

            setDocsContent({
                jsx: false,
                data: makeHTML(file.content),
                raw: file,
                path: file.path.split("/").slice(1).join("/").split(".").shift()
            });
        } else {
            setDocsContent({ jsx: true, data: notCustom, raw: notCustom, path: `${notCustom.head}/${notCustom.name}` });
        }
    }

    function highlight() {
        document.querySelectorAll("pre code").forEach((el) => {
            hljs.highlightBlock(el);
        });
    }

    const sideBarData = {};

    custom.forEach(m => {
        let content = sideBarData[m.name] || [];
        content.push(...Object.values(m.files).map(x => ({
            name: x.name,
            path: `/docs?path=${x.path.match(UTILS.PATH_PARSER)[1]}`
        })));
        sideBarData[m.name] = content;
    });

    data.forEach(m => {
        let content = sideBarData[m.name] || [];
        content.push(...m.data.map(x => ({
            name: x.name,
            path: `/docs?path=${m.name}/${x.name}`
        })));
        sideBarData[m.name] = content;
    });

    const toggleSidebar = () => {
        const classNames = "hidden";
        document.getElementById("sidebar").classList.toggle(classNames);
    }

    return (
        <div className="mx-10 my-5">
            <button className="text-white bg-gray-700 rounded-full px-2 py-1 z-40 fixed bottom-9 left-10 lg:hidden" onClick={toggleSidebar}>
                ❤
            </button>
        
            <div className="flex flex-col lg:flex-row">
                <div class="hidden fixed overflow-y-auto rounded lg:rounded-none shadow lg:shadow-none px-5 py-4 lg:px-0 lg:py-0 left-8 lg:left-auto right-8 lg:right-auto top-8 lg:top-auto bottom-8 lg:bottom-auto lg:static lg:block z-50 lg:z-auto bg-gray-800 lg:bg-gray-900" id="sidebar">
                    <button className="text-white bg-gray-600 w-full rounded lg:hidden px-3 py-2 mb-5" onClick={toggleSidebar}>
                        Close ❌
                    </button>
                    {
                        Object.entries(sideBarData).map(([name, content], i) => {
                            return (
                                <div class="mb-4">
                                    <p className="mb-2 font-semibold text-sm text-gray-300 font-sans uppercase">{name}</p>
                                    <ul className="lg:mr-8">
                                        {content.map((child, j) => {
                                            return (
                                                <li key={i + j}>
                                                    <Link
                                                        href={child.path}
                                                    >
                                                        <a
                                                            href="#"
                                                            className="px-3 flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 transition-colors duration-200"
                                                            onClick={toggleSidebar}
                                                        >
                                                            <span>
                                                                <svg
                                                                    className="w-5 h-5"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                                                    ></path>
                                                                </svg>
                                                            </span>
                                                            <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
                                                                {child.name}
                                                            </span>
                                                        </a>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="mt-6 lg:mt-0 lg:border-l-2 lg:border-gray-300 lg:pl-8 flex-grow">
                    <Viewer data={docsContent} />
                </div>
            </div>
        </div>
    );
}
