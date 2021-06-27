<script>
    import { Router } from "@roxi/routify";
    import { routes } from "../.routify/routes";
</script>

<Router {routes} />

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
