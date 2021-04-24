import { useState, useEffect } from "react";
import { Converter } from "showdown";
import Viewer from "./Viewer";
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const params = ["classes", "typedefs"];
const mdconv = new Converter({
    tables: true,
    ghCodeBlocks: true,
    emoji: true,
    ghCompatibleHeaderId: true
});

const makeHTML = (md) => mdconv.makeHtml(md);

export default function Sidebar({ docs }) {
    if (!docs) return (
        <div className="relative container mx-auto bg-gray-900 min-h-screen">
            <h1 className="text-white text-xl text-center py-5">Error: Could not load docs! <a className="text-blue-400" href="/docs">Reload?</a></h1>
        </div>
    )
    const [docsContent, setDocsContent] = useState({ jsx: false, data: null });
    const data = Object.keys(docs).filter(a => params.includes(a)).map(m => ({ name: m, data: docs[m] }));
    const custom = Object.values(docs.custom);
    
    if (!docsContent.data) {
        let doccont = Object.values(custom[0].files)[0];

        if (doccont.type === "js") doccont.content = `\`\`\`js\n${doccont.content}\`\`\``;

        setDocsContent({ jsx: false, data: makeHTML(doccont.content) });
    }

    useEffect(() => {
        document.body.classList.add("bg-gray-800");
        highlight();
    });

    const handler = (e) => e.preventDefault();

    function navigate(navigateTo, e, notCustom = false) {
        handler(e);

        if (!notCustom) {
            const loc = custom.find(x => x.files[navigateTo] !== undefined);
            const file = loc.files[navigateTo];

            if (file.type === "js") file.content = `\`\`\`js\n${file.content}\`\`\``;

            setDocsContent({ jsx: false, data: makeHTML(file.content) });
        } else {
            setDocsContent({ jsx: true, data: notCustom });
        }
    }

    function highlight() {
        document.querySelectorAll('pre code').forEach(el => {
            hljs.highlightBlock(el);
        });
    }

    return (
        <div className="relative container mx-auto bg-gray-900">
            <div className="space-x-4 py-5 inline-flex bg-gray-900">
                <div className="lg:hidden">
                    <button className="navbar-burger flex items-center text-gray-600 p-3" onClick={(e) => handler(e) && document.getElementById('doc_mobile').classList.toggle('hidden')}>
                        <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M24 22h-24l12-20z" />
                        </svg>
                    </button>
                </div>
                <div className="hidden sm:block" id="doc_mobile">
                    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-900 text-gray-50">
                        <div className="flex flex-col top-0 left-0 w-64 bg-gray-900 h-full">
                            <div className="overflow-y-auto overflow-x-auto flex-grow">
                                <ul className="flex flex-col py-6 space-y-1">
                                    {
                                        /* Custom Doc File */
                                        custom.map((m, i) => {
                                            const params = Object.values(m.files);
                                            const keys = Object.keys(m.files);

                                            return (
                                                <>
                                                    <li className="px-5" key={i}>
                                                        <div className="flex flex-row items-center h-8">
                                                            <div className="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">{m.name}</div>
                                                        </div>
                                                    </li>
                                                    {params.map((n, j) => {
                                                        return (
                                                            <li key={i + j}>
                                                                <a href="#"
                                                                    onClick={(e) => navigate(keys[j], e)}
                                                                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                                                                    <span className="inline-flex justify-center items-center ml-4">
                                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                                                                    </span>
                                                                    <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">{n.name}</span>
                                                                </a>
                                                            </li>
                                                        )
                                                    })}
                                                </>
                                            )
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
                                                            <div className="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">{m.name}</div>
                                                        </div>
                                                    </li>
                                                    {params.map((n, j) => {
                                                        return (
                                                            <li key={i + j}>
                                                                <a href="#"
                                                                    onClick={(e) => navigate(m.data[n].name, e, m.data[n])}
                                                                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                                                                    <span className="inline-flex justify-center items-center ml-4">
                                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                                                                    </span>
                                                                    <span className="ml-2 font-semibold text-sm tracking-wide truncate font-sans">{m.data[n].name}</span>
                                                                </a>
                                                            </li>
                                                        )
                                                    })}
                                                </>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="docs-container px-5 lg:border-l-2 lg:border-gray-300 min-w-min">
                    <div id="docs-content" className="text-white prose">
                        <Viewer data={docsContent} />
                    </div>
                </div>
            </div>
        </div>
    )
}
