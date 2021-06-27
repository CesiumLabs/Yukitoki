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
</script>

<Router {routes} />

{#if showScrollUp}
    <ScrollUp />
{/if}

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    /* width */
    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #ffffff;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #304eb6;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #304eb6;
    }
</style>
