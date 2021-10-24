<script>
    import { params, url } from "@roxi/routify";
    import { FontAwesomeIcon } from "fontawesome-svelte";
    import { faChevronCircleRight, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
    import Sources from "~/data/sources";

    export let data;

    let currentBranch = data[0].tag,
        currentID = data[0].id;

    const { source, tag, category, file } = $params;
    let currentDoc = data.find((x) => x.tag === tag && x.id === source);

    function updateData() {
        const src = document.getElementById("docsource");
        const branch = (currentID === src.value ? document.getElementById("docbranch")?.value : Sources[src?.value ?? source].defaultTag) ?? currentBranch;

        window.location.href = `/docs/${src.value}/${branch}${`/${category || currentDoc.defaultFile.category}` || ""}${`/${file || currentDoc.defaultFile.id}` || ""}`;
    }

    const sidebarProps = ["custom", "classes", "typedefs"]
        .map((m) => {
            const d = currentDoc[m];
            return { type: m === "classes" ? "class" : m === "typedefs" ? "typedef" : m, data: d };
        })
        .filter((x) => !!x);

    function toggleSidebar() {
        const elm = document.getElementById("sidebar-panel");
        if (elm) {
            elm.classList.toggle("-translate-x-full");
        }
    }
</script>

<div class="absolute left-0 flex items-center md:hidden">
    <button on:click={toggleSidebar} type="button" class="inline-flex items-center justify-center p-2 rounded-md text-white" aria-controls="mobile-menu" aria-expanded="false">
        <span class="sr-only">#</span>
        <button class="bg-primary text-2xl p-2">
            <FontAwesomeIcon icon={faChevronCircleRight} />
        </button>
    </button>
</div>

<div class="inline-block z-10 fixed lg:block lg:relative bg-base-100  transition sidebar transform-gpu -translate-x-full lg:translate-x-0 mb-5" id="sidebar-panel">
    <div class="sticky top-0 overflow-y-auto overflow-x-hidden w-72 md:w-80 sidebar-height">
        <div class="absolute right-0 flex items-center md:hidden">
            <button on:click={toggleSidebar} type="button" class="inline-flex items-center justify-center p-2 rounded-md text-white" aria-controls="mobile-menu" aria-expanded="false">
                <span class="sr-only">#</span>
                <button class="bg-primary text-2xl p-2">
                    <FontAwesomeIcon icon={faTimesCircle} />
                </button>
            </button>
        </div>

        <nav class="my-5 px-2 space-y-1 py-3 select-none">
            <ul>
                <li class="flex flex-col">
                    <label for="docsource" class="font-semibold text-lg">Source</label>
                    <select on:input={updateData} id="docsource" class="form-select rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0 text-black">
                        {#each Object.keys(Sources) as doc}
                            {#if doc === source}
                                <option value={doc} selected>{doc}</option>
                            {:else}
                                <option value={doc}>{doc}</option>
                            {/if}
                        {/each}
                    </select>
                </li>
                <li class="flex flex-col">
                    <label for="docbranch" class="font-semibold text-lg">Branch</label>
                    <select on:input={updateData} id="docbranch" class="form-select rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0 text-black">
                        {#each data.filter((x) => x.id === currentID) as doc}
                            <option value={doc.tag} selected={tag === doc.tag ? true : false}>{doc.tag}</option>
                        {/each}
                    </select>
                </li>
            </ul>
            {#each sidebarProps as prop}
                {#if prop.type === "custom"}
                    {#each Object.keys(prop.data) as item}
                        <label for="files" class="font-semibold text-lg uppercase">{prop.data[item].name}</label>
                        <div id="files" class="flex flex-col">
                            {#each Object.entries(prop.data[item].files) as [filename, file]}
                                <a class="sidebar-item-selector font-semibold hover:bg-primary" target="_self" href={$url(`/docs/${source}/${tag}/${item}/${filename}`)}>{file.name}</a>
                            {/each}
                        </div>
                    {/each}
                {:else if Object.keys(prop.data).length}
                    <label for={prop.type} class="font-semibold text-lg uppercase">{prop.type}</label>
                    <div id={prop.type} class="flex flex-col">
                        {#each Object.values(prop.data) as item}
                            <a class="sidebar-item-selector font-semibold hover:bg-primary" target="_self" href={$url(`/docs/${source}/${tag}/${prop.type}/${item.name}`)}>{item.name}</a>
                        {/each}
                    </div>
                {/if}
            {/each}
        </nav>
    </div>
</div>

<style>
    .sidebar-height {
        height: calc(100vh - theme("height.16"));
    }

    .sidebar::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 999em;
        pointer-events: none;
    }

    .sidebar-item-selector {
        padding-left: 1rem;
    }

    .sidebar-item-selector:hover {
        cursor: pointer;
        color: #ffffff;
    }
</style>
