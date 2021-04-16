import Head from "next/head";
import "tailwindcss/tailwind.css";
import "../styles/global.css";

export default function Application({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/favicon.png" />
                <title>Snowflake Studio ❄</title>
            </Head>

            <Component {...pageProps} />
        </>
    )
}