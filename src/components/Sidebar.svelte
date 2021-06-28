<script>
    export let data;

    let currentBranch = data[0].tag,
        currentID = data[0].id;

    const currentDoc = data.find((x) => x.tag === currentBranch && x.id === currentID);

    console.log("DATA", data);

    function updateData() {
        const src = document.getElementById("docsource");
        const branch = document.getElementById("docbranch");

        currentBranch = branch?.value;
        currentID = src?.value;
    }

    const sidebarProps = ["custom", "classes", "typedefs"]
        .map((m) => {
            const d = currentDoc[m];
            return { type: m, data: d };
        })
        .filter((x) => !!x);
</script>

<div class="inline-block fixed lg:block lg:relative z-10 transition sidebar transform-gpu -translate-x-full lg:translate-x-0">
    <div class="sticky top-0 overflow-y-auto overflow-x-hidden w-72 md:w-80 lg:custom-scroll sidebar-height">
        <nav class="my-5 px-2 space-y-1 z-10 py-3 select-none">
            <ul>
                <li class="flex flex-col">
                    <label for="docsource" class="font-semibold text-lg">Source</label>
                    <select on:input={updateData} id="docsource" class="form-select rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0 text-black">
                        {#each [...new Set(data.map((m) => m.id))] as doc}
                            <option value={doc} selected={currentID === doc ? "true" : "false"}>{doc}</option>
                        {/each}
                    </select>
                </li>
                <li class="flex flex-col">
                    <label for="docbranch" class="font-semibold text-lg">Branch</label>
                    <select on:input={updateData} id="docbranch" class="form-select rounded-md border-transparent bg-gray-100 focus:border-gray-500 focus:bg-white focus:ring-0 text-black">
                        {#each data.filter((x) => x.id === currentID) as doc}
                            <option value={doc.tag} selected={currentBranch === doc.tag ? true : false}>{doc.tag}</option>
                        {/each}
                    </select>
                </li>
            </ul>
            {#each sidebarProps as prop}
                {#if prop.type === "custom"}
                    {#each Object.keys(prop.data) as item}
                        <label for="files" class="font-semibold text-lg">{prop.data[item].name}</label>
                        <ul id="files">
                            {#each Object.values(prop.data[item].files) as file}
                                <li class="sidebar-item-selector">{file.name}</li>
                            {/each}
                        </ul>
                    {/each}
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
        background-color: #7289da;
        cursor: pointer;
        color: #ffffff;
    }
</style>
