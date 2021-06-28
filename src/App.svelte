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

<style lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
    }
    ::-webkit-scrollbar-track {
        background: #ffffff;
    }
    ::-webkit-scrollbar-thumb {
        background: #304eb6;
    }
</style>
