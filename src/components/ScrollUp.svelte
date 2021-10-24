<script>
    import { FontAwesomeIcon } from "fontawesome-svelte";
    import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

    function scrollUp() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
</script>

<div class="fixed bottom-0 right-0 pb-4 mr-4">
    <span on:click={scrollUp} class="bg-primary-focus text-white rounded-md cursor-pointer p-3">
        <FontAwesomeIcon icon={faArrowUp} />
    </span>
</div>
