import { useState, useEffect } from "react";
import { Converter } from "showdown";
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const params = ["classes", "typedefs"];

const makeHTML = (md) => new Converter({ tables: true, ghCodeBlocks: true, emoji: true, }).makeHtml(md);

export default function Sidebar({ docs }) {
    const [docsContent, setDocsContent] = useState();
    const data = Object.keys(docs).filter(a => params.includes(a)).map(m => ({ name: m, data: docs[m] }));
    const custom = Object.values(docs.custom);
    if (!docsContent) setDocsContent(makeHTML(Object.values(custom[0].files)[0].content));

    useEffect(() => highlight());

    const handler = (e) => {
        e.preventDefault();
    }

    function navigate(navigateTo) {
        const loc = custom.find(x => x.files[navigateTo] !== undefined);
        const file = loc.files[navigateTo]

        setDocsContent(makeHTML(file.content))
    }

    function highlight() {
        document.querySelectorAll('pre code').forEach(el => {
            hljs.highlightBlock(el);
        });
    }

    return (
        <div className="relative container mx-auto">
            <div className="space-x-4 py-5 flex">
                <div className="inline-block">
                    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-900 text-gray-50">
                        <div className="flex flex-col top-0 left-0 w-64 bg-gray-900 h-full">
                            <div className="pl-6 h-20 border-b border-gray-800">
                                <div className="mr-3 pt-6 relative mx-auto text-gray-600">
                                    <input className="appearance-none p-3 mx-auto my-auto w-full text-xs font-semibold leading-none bg-gray-50 rounded outline-none" type="text" name="field-name" placeholder="Search" onKeyUp={(e) => e.keyCode === 13 ? handler(e) : null} />
                                </div>
                            </div>
                            <div className="overflow-y-auto overflow-x-hidden flex-grow">
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
                                                                    onClick={() => navigate(keys[j])}
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

                <div className="inline-block docs-container px-5 border-l-2 border-gray-300">
                    <div id="docs-content" className="text-white prose" dangerouslySetInnerHTML={{ __html: docsContent }}></div>
                </div>
            </div>
        </div>
    )
}
