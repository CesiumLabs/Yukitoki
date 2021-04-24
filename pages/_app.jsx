import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/global.css";
import { META } from "../config";

export default function Application({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width,initial-scale=1.0" />
                <meta property="og:url" content={META.URL} />
                <meta property="og:title" content={META.TITLE} />
                <meta property="og:description" content={META.DESCRIPTION} />
                <meta property="og:image" content={META.IMAGE} />
                <meta name="theme-color" content="#4285F4" />
                <link rel="shortcut icon" href="/favicon.png" />
                <title>{META.TITLE}</title>
            </Head>

            <Component {...pageProps} />
        </>
    );
}
