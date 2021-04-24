import { useState, useEffect } from "react";
import { Converter } from "showdown";
import Viewer from "./Viewer";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import { useRouter } from "next/router";
import ErrorPage from "./Error";
import Link from "next/link";

const params = ["classes", "typedefs"];
const mdconv = new Converter({
    tables: true,
    ghCodeBlocks: true,
    emoji: true,
    ghCompatibleHeaderId: true
});

const makeHTML = (md) => mdconv.makeHtml(md);

export default function Sidebar({ docs }) {
    const router = useRouter();
    const path = router.query.path || "";
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
        document.body.classList.add("bg-gray-800");
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

    return (
        <div className="relative container mx-auto bg-gray-900">
            <div className="space-x-4 py-5 inline-flex bg-gray-900">
                <div>
                    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-900 text-gray-50">
                        <div className="flex flex-col top-0 left-0 w-64 bg-gray-900 h-full">
                            <div className="overflow-y-auto overflow-x-auto flex-grow">
                                <ul className="flex flex-col py-6 space-y-1">
                                    {
                                        /* Custom Doc File */
                                        custom.map((m, i) => {
                                            const params = Object.values(m.files);

                                            return (
                                                <>
                                                    <li className="px-5" key={i}>
                                                        <div className="flex flex-row items-center h-8">
                                                            <div className="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">
                                                                {m.name}
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {params.map((n, j) => {
                                                        return (
                                                            <li key={i + j}>
                                                                <Link
                                                                    href={`/docs?path=${n.path
                                                                        .split("/")
                                                                        .slice(1)
                                                                        .join("/")
                                                                        .split(".")
                                                                        .shift()}`}
                                                                >
                                                                    <a
                                                                        href="#"
                                                                        className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
                                                                    >
                                                                        <span className="inline-flex justify-center items-center ml-4">
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
                                                                            {n.name}
                                                                        </span>
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </>
                                            );
                                        })
                                    }

                                    {
                                        /* Classes, Typedefs etc */
                                        data.map((m, i) => {
                                            const params = Object.keys(m.data);

                                            return (
                                                <>
                                                    <li className="px-5" key={i}>
                                                        <div className="flex flex-row items-center h-8">
                                                            <div className="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">
                                                                {m.name}
                                                            </div>
                                                        </div>
                                                    </li>
                                                    {params.map((n, j) => {
                                                        return (
                                                            <li key={i + j}>
                                                                <Link href={`/docs?path=${m.name}/${m.data[n].name}`}>
                                                                    <a
                                                                        href="#"
                                                                        className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
                                                                    >
                                                                        <span className="inline-flex justify-center items-center ml-4">
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
                                                                            {m.data[n].name}
                                                                        </span>
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="docs-container px-5 lg:border-l-2 lg:border-gray-300 min-w-min">
                    <Viewer data={docsContent} />
                </div>
            </div>
        </div>
    );
}
