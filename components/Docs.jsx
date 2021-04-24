import Navbar from "./Navbar";
import Footer from "./Footer";
import SideBar from "./docs/Sidebar";
import { LOCAL_TYPES } from "../config";

export default function Docs({ docs }) {

    function applyTypes() {
        try {
            docs["classes"].forEach(c => {
                if (!LOCAL_TYPES.some(x => x.name === c.name)) LOCAL_TYPES.push({ name: c.name, path: "classes" });
            });

            docs["typedefs"].forEach(td => {
                if (!LOCAL_TYPES.some(x => x.name === td.name)) LOCAL_TYPES.push({ name: td.name, path: "typedefs" });
            })
        } catch {}
    }

    applyTypes();

    return (
        <div className="bg-gray-900">
            <Navbar />
            <SideBar docs={docs} />
            <Footer />
        </div>
    );
}
