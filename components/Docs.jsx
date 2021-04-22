import Navbar from "./Navbar";
import Footer from "./Footer";
import SideBar from "./docs/Sidebar"

export default function Docs({ docs }) {
    return (
        <div className="bg-gray-900">
            <Navbar />
            <SideBar docs={docs} />
            <Footer />
        </div>
    )
}
