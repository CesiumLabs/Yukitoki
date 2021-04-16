export default function Navbar() {

    return (
        <section>
            <nav className="relative py-6 bg-gray-800">
                <div className="container mx-auto px-4 flex justify-between items-center">
                <a className="text-3xl font-bold leading-none" href="#"><img className="h-12" src="/favicon.png" alt="" width="auto"/></a>
                <div className="lg:hidden">
                        <button className="navbar-burger flex items-center text-green-600 p-3" onClick={() => document.getElementById('mobile_menu').classList.remove('hidden') }>
                    <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                    </button>
                </div>
                <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
                    <li><a className="text-sm text-gray-400 hover:text-gray-500" href="#">Menu</a></li>

                    <li><a className="text-sm text-gray-400 hover:text-gray-500" href="#">Menu</a></li>
                    
                    <li><a className="text-sm text-gray-400 hover:text-gray-500" href="#">Menu</a></li>
                    
                    <li><a className="text-sm text-gray-400 hover:text-gray-500" href="#">Menu</a></li>
                    
                    <li><a className="text-sm text-gray-400 hover:text-gray-500" href="#">Menu</a></li>
                </ul>
                <a className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-l-xl rounded-t-xl transition duration-200" href="#">GitHub</a>
                <a className="hidden lg:inline-block py-2 px-6 bg-green-500 hover:bg-green-600 text-sm text-white font-bold rounded-l-xl rounded-t-xl transition duration-200" href="#">Discord</a>
                </div>
            </nav>
            <div className="hidden navbar-menu relative z-50" id="mobile_menu">
                <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
                <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto bg-gray-800">
                <div className="flex items-center mb-8">
                    <a className="mr-auto text-3xl font-bold leading-none" href="#"><img className="h-10" src="/favicon.png" alt="" width="auto"/></a>
                        <button className="navbar-close" onClick={() => document.getElementById('mobile_menu').classList.add('hidden')}>
                    <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    </button>
                </div>
                <div>
                    <ul>
                        <li className="mb-1"><a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-green-600 rounded" href="#">Menu</a></li>
                        <li className="mb-1"><a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-green-600 rounded" href="#">Menu</a></li>
                        <li className="mb-1"><a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-green-600 rounded" href="#">Menu</a></li>
                        <li className="mb-1"><a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-green-600 rounded" href="#">Menu</a></li>
                        <li className="mb-1"><a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-green-600 rounded" href="#">Menu</a></li>
                    </ul>
                </div>
                </nav>
            </div>
        </section>
    )
}
