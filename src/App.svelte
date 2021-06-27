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
        background: #FFFFFF;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #304EB6;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #304EB6;
    }
</style>
