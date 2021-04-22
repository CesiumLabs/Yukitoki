import Link from "next/link";
import { SITE_NAME, NAV_LINKS } from "../config";

export default function Navbar() {

    return (
        <section>
            <nav className="relative py-6 bg-gray-800">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link href="/">
                        <a className="text-3xl font-bold leading-none text-gray-200">{SITE_NAME}</a>
                    </Link>
                    <div className="lg:hidden">
                        <button className="navbar-burger flex items-center text-green-600 p-3" onClick={() => document.getElementById('mobile_menu').classList.remove('hidden')}>
                            <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                            </svg>
                        </button>
                    </div>
                    <ul className="hidden absolute top-1/2 left-3/4 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
                        {
                            NAV_LINKS.map((m, i) => {
                                if (m.external) return (
                                    <li key={i}>
                                        <a className="text-sm text-gray-400 hover:text-gray-500" href={m.path} target="_blank">{m.name}</a>
                                    </li>
                                )

                                return (
                                    <li key={i}>
                                        <Link href={m.path}>
                                            <a className="text-sm text-gray-400 hover:text-gray-500">{m.name}</a>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </nav>
            <div className="hidden navbar-menu relative z-50" id="mobile_menu">
                <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
                <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 overflow-y-auto bg-gray-800">
                    <div className="flex items-center mb-8">
                        <Link href="/">
                            <a className="mr-auto text-3xl font-bold leading-none text-gray-200">{SITE_NAME}</a>
                        </Link>
                        <button className="navbar-close" onClick={() => document.getElementById('mobile_menu').classList.add('hidden')}>
                            <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <ul>
                            {
                                NAV_LINKS.map((m, i) => {
                                    if (m.external) return (
                                        <li className="mb-1" key={i}>
                                            <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 rounded" href={m.path} target="_blank">{m.name}</a>
                                        </li>
                                    )

                                    return (
                                        <li className="mb-1" key={i}>
                                            <Link href={m.path}>
                                                <a onClick={() => document.getElementById('mobile_menu').classList.add('hidden')} className="block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 rounded">{m.name}</a>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </section>
    )
}
