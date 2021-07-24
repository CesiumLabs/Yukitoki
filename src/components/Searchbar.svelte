<script>
    import { faSearch } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "fontawesome-svelte";
    import Popup from "svelte-atoms/Popup.svelte";
    import Search from "~/app/Search";
    import { params } from "@roxi/routify";
    import Button from "svelte-atoms/Button.svelte";
    import SearchBox from "./SearchBox.svelte";
    export let docs;
    let searchResult = null;
 let isOpen = false;
 const open = () =>{
   isOpen = true;
 }
 const close = () =>{
   isOpen = false;
   searchResult = null;
 }
    function search(event) {
        if (event.keyCode !== 13) return;
        const query = event.target.value;

        searchResult = Search(query, docs, $params);
        open();
    }
</script>

<div class="w-full md:w-1/2 px-4 pb-2 mx-auto">
    <div class="relative">
        <span class="absolute text-gray-700 top-4 left-4 pointer-events-none">
            <FontAwesomeIcon icon={faSearch} />
        </span>
        <input on:keyup={search} id="searchbox" placeholder="Search..." type="text" class="placeholder-gray-400 bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0 text-black h-14 w-full px-12 rounded-md focus:shadow-xl" />
    </div>
</div>

{#if searchResult}
<Popup {isOpen} on:close={close} header="Results">
  <div>
    <SearchBox searchResults={searchResult} />
    </div>
 <div slot="footer">
    <Button on:click={close}>Close</Button>
  </div>
    </Popup>
{/if}
