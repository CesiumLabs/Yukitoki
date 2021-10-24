<script>
    import { FontAwesomeIcon } from "fontawesome-svelte";
    import { faTimes } from "@fortawesome/free-solid-svg-icons";

    export let searchResults;

    function close() {
        searchResults = null;
    }
</script>

{#if searchResults}
    <div class="bg-gray-100 z-10 shadow-2xl m-4 sm:m-8 mx-auto overflow-y-auto text-black">
        <div class="flex border-b p-2 text-xl">
            <h1 class="text-xl font-bold text-center mx-auto">Search Result</h1>
            <span class="px-5 cursor-pointer" on:click={close}><FontAwesomeIcon icon={faTimes} /></span>
        </div>
        <div class="p-2 font-semibold flex flex-col select-none">
            {#if !searchResults.length}
                <h1 class="text-center text-black">No results were found!</h1>
            {:else}
                {#each searchResults as result}
                    <a href={result.path} target="_self" class="p-3 text-center text-primary hover:text-white hover:bg-primary-focus cursor-pointer">{result.text}</a>
                {/each}
            {/if}
        </div>
    </div>
{/if}
