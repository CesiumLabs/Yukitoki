import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/global.css";
import { META } from "../config";
import { useEffect } from "react";

export default function Application({ Component, pageProps }) {
    useEffect(() => document.body.classList.add("bg-gray-900"));

    return (
        <>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width,initial-scale=1.0" />

                <meta property="og:url" content={META.URL} />
                <meta property="og:title" content={META.TITLE} />
                <meta property="og:description" content={META.DESCRIPTION} />
                <meta property="og:image" content={META.IMAGE} />

                <meta property="url" content={META.URL} />
                <meta property="title" content={META.TITLE} />
                <meta property="description" content={META.DESCRIPTION} />
                <meta property="image" content={META.IMAGE} />

                <meta property="twitter:url" content={META.URL} />
                <meta property="twitter:title" content={META.TITLE} />
                <meta property="twitter:description" content={META.DESCRIPTION} />
                <meta property="twitter:image" content={META.IMAGE} />

                <meta name="theme-color" content="#4285F4" />
                <link rel="shortcut icon" href="/favicon.png" />

                <script async src="https://arc.io/widget.min.js#6TjnmPuK"></script>

                
                <title>{META.TITLE}</title>
            </Head>

            <Component {...pageProps} />
        </>
    );
}
