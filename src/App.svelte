<script>
    import { Router } from "@roxi/routify";
    import { routes } from "../.routify/routes";
    import ScrollUp from "./components/ScrollUp.svelte";

    let showScrollUp = false;

    document.addEventListener("scroll", () => {
        const pos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (pos > 300) showScrollUp = true;
        else showScrollUp = false;
    });

    window.addEventListener("keyup", (e) => {
        if (e.key === "/") {
            e.preventDefault();
            document.getElementById("searchbox")?.focus();
        }
    });
</script>

<Router {routes} />

{#if showScrollUp}
    <ScrollUp />
{/if}

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    html,
    body {
        scroll-behavior: smooth;
    }

    ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
    }
    ::-webkit-scrollbar-track {
        background: #ffffff;
    }
    ::-webkit-scrollbar-thumb {
        @apply bg-primary-focus;
    }

    @layer utilities {
        .split-word {
            word-break: break-word;
        }
    }

    /*
     * Visual Studio 2015 dark style
     * Author: Nicolas LLOBERA <nllobera@gmail.com>
     */

    .hljs {
        background: #1e1e1e;
        color: #268bd2;
    }

    .hljs-keyword,
    .hljs-literal,
    .hljs-symbol,
    .hljs-name {
        color: #569cd6;
    }
    .hljs-link {
        color: #569cd6;
        text-decoration: underline;
    }

    .hljs-built_in,
    .hljs-type {
        color: #4ec9b0;
    }

    .hljs-number,
    .hljs-class {
        color: #b8d7a3;
    }

    .hljs-string,
    .hljs-meta .hljs-string {
        color: #d69d85;
    }

    .hljs-regexp,
    .hljs-template-tag {
        color: #9a5334;
    }

    .hljs-subst,
    .hljs-function,
    .hljs-title,
    .hljs-params,
    .hljs-formula {
        color: #268bd2;
    }

    .hljs-comment,
    .hljs-quote {
        color: #57a64a;
        font-style: italic;
    }

    .hljs-doctag {
        color: #608b4e;
    }

    .hljs-meta,
    .hljs-meta .hljs-keyword,
    .hljs-tag {
        color: #9b9b9b;
    }

    .hljs-variable,
    .hljs-template-variable {
        color: #bd63c5;
    }

    .hljs-attr,
    .hljs-attribute {
        color: #268bd2;
    }

    .hljs-section {
        color: gold;
    }

    .hljs-emphasis {
        font-style: italic;
    }

    .hljs-strong {
        font-weight: bold;
    }

    /*.hljs-code {
        font-family:'Monospace';
    }*/

    .hljs-bullet,
    .hljs-selector-tag,
    .hljs-selector-id,
    .hljs-selector-class,
    .hljs-selector-attr,
    .hljs-selector-pseudo {
        color: #d7ba7d;
    }

    .hljs-addition {
        background-color: #144212;
        display: inline-block;
        width: 100%;
    }

    .hljs-deletion {
        background-color: #600;
        display: inline-block;
        width: 100%;
    }

    code:not([class]) {
        background-color: #1f1d1d;
        color: #ffffff;
        padding-left: 5px;
        padding-right: 5px;
    }

    li {
        list-style-position: inside;
    }

    .porse li {
        list-style-type: disc;
    }

    .porse li p {
        display: contents;
    }

    blockquote {
        border-left: 5px solid #7289da;
        background-color: #e7e5e5;
        padding: 15px;
        border-radius: 3px;
        color: #000000;
    }

    blockquote:hover {
        background-color: #cecece;
    }

    .warn {
        background-color: #ff4141;
        width: fit-content;
        color: #ffffff;
        padding-left: 5px;
        padding-right: 5px;
    }

    .info {
        background-color: #ffff2d;
        width: fit-content;
        color: #000000;
        padding-left: 5px;
        padding-right: 5px;
    }
</style>
