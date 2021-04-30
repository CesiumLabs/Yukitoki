import Link from "next/link";
import { SITE_NAME, NAV_LINKS } from "../config";

export default function Navbar() {
    const flexBox = "flex flex-col md:flex-row items-center";

    const navLinksDiv = NAV_LINKS.map((m, i) => {
        const classes = "text-gray-400 hover:text-gray-500";
        if (m.external)
            return (
                <p key={i}>
                    <a
                        className={classes}
                        href={m.path}
                        target="_blank"
                    >
                        {m.name}
                    </a>
                </p>
            );

        return (
            <p key={i}>
                <Link href={m.path}>
                    <a className={classes}>{m.name}</a>
                </Link>
            </p>
        );
    });

    return (
        <section>
            <nav className="bg-gray-800 py-6">
                <div className={`${flexBox} justify-around`}>
                    <div className={`${flexBox} md:space-x-5`}>
                        <Link href="/">
                            <a className="text-3xl font-bold leading-none text-gray-200">{SITE_NAME}</a>
                        </Link>
                    </div>
                    <div className={`${flexBox} mt-4 md:mt-0 md:space-x-5`}>
                        {navLinksDiv}
                    </div>
                </div>
            </nav>
        </section>
    )
}