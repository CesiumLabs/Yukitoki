<script>
    import { params } from "@roxi/routify";
    import { onMount } from "svelte";

    function scrollToProp(id) {
        if (!id) return;
        const propElm = document.getElementById(`scroll-prop-${id}`);
        const parentElm = document.getElementById("relativeContainer");
        if (!propElm || !parentElm) return;

        const offsets = {
            parent: parentElm.getBoundingClientRect(),
            child: propElm.getBoundingClientRect()
        };

        const position = {
            top: offsets.child.top - offsets.parent.top
        };

        window.scrollBy(position);
    }

    onMount(() => {
        const { scrollTo } = $params;
        if (scrollTo) scrollToProp(scrollTo);
    });
</script>
