<script>
    import { faCode } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "fontawesome-svelte";

    export let url;
</script>

<span class="cursor-pointer text-primary hover:text-primary-focused ml-auto text-2xl">
    <a href={url} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faCode} /></a>
</span>
