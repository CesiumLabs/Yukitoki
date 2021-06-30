<script>
    import Sidebar from "~/components/Sidebar.svelte";
    import Navbar from "~/components/Navbar.svelte";
    import Footer from "~/components/Footer.svelte";
    import { params } from "@roxi/routify";
    import DocsStore from "~/app/DocsStore";
    import Searchbar from "~/components/Searchbar.svelte";
    import Loader from "~/components/Loader.svelte";
    import Sources from "~/data/sources";
    import markdown from "~/app/Markdown";
    import ParamsTable from "~/components/ParamsTable.svelte";
    import Badge from "~/components/Badge.svelte";
    import ViewSource from "~/components/ViewSource.svelte";

    const { source, tag, class: className } = $params;

    const docsSource = new DocsStore(Sources[source]);
    let docs = null,
        content = null;

    docsSource.fetchDocs().then((doc) => {
        doc = doc.find((x) => x.tag === tag);
        docs = doc.classes.find((c) => c.name === className);
        docs.globalName = doc.global;
        docs.sourceLink = docsSource.manager.source;

        if (!docs) content = "# Docs not found!";
    });

    function getName(item) {
        if (item.async) return "async";
        if ("access" in item && item.access?.length) return item.access;
        if ("scope" in item && item.scope?.length) return item.scope;
    }
</script>

<Navbar />
{#if docs}
    <div class="text-gray-800 dark:text-white bg-white dark:bg-gray-800 pt-3 w-full">
        <Searchbar />

        <div class="lg:flex mx-auto w-full max-w-screen-2xl">
            <Sidebar data={docsSource.docs} />
            <div class="porse break-words mx-auto py-16 px-4 sm:px-8 lg:py-8 w-full max-w-4xl lg:max-w-7xl">
                {#if content !== null}
                    {@html markdown(content)}
                {:else}
                    <div class="class-constructor-info">
                        <div class="flex">
                            <h1 class="text-3xl dark:text-white text-black font-bold">{docs.construct?.name ?? docs.name}</h1>
                            <ViewSource url={`${docs.sourceLink}/${tag}/${docs.meta.path}/${docs.meta.file}#L${docs.meta.line}`} />
                        </div>
                        <span class="text-md dark:text-gray-300">{@html docs.construct?.description ?? ""}</span>
                        <div class="construct">
                            {@html markdown(`\`\`\`js\nnew ${docs.globalName ? `${docs.globalName}.` : ""}${docs.construct?.name ?? docs.name}(${docs.construct?.params?.map((m) => m.name).join(", ") ?? ""});\n\`\`\``)}
                            {#if docs.construct?.params?.length}
                                <div class="mt-6">
                                    <ParamsTable data={docs.construct.params} />
                                </div>
                            {/if}
                        </div>
                    </div>
                    {#if docs.methods?.length || docs.props?.length || docs.events?.length}
                        <div class="grid md:grid-cols-3 grid-cols-1 gap-4 py-10">
                            {#each [{ name: "Properties", data: docs.props }, { name: "Methods", data: docs.methods }, { name: "Events", data: docs.events }].filter((x) => !!x.data) as item}
                                <div class="{item.name}-qm">
                                    <h1 class="text-xl font-bold uppercase">{item.name}</h1>
                                    <ul>
                                        {#each item.data as prop}
                                            <li style="list-style-type:none;" class="cursor-pointer text-lg text-blurple-500 px-2 font-semibold border-l-2 hover:border-blurple-500">
                                                <a href="#{prop.name}" target="_self">{prop.name}</a>
                                            </li>
                                        {/each}
                                    </ul>
                                </div>
                            {/each}
                        </div>

                        <div>
                            {#each [{ name: "Properties", data: docs.props }, { name: "Methods", data: docs.methods }, { name: "Events", data: docs.events }].filter((x) => !!x.data) as item}
                                <div class="{item.name} py-3">
                                    <h1 class="text-3xl font-bold uppercase">{item.name}</h1>
                                    <div class="prop-data py-5">
                                        {#each item.data as prop}
                                            <div id={prop.name} class="py-3">
                                                <div class="flex">
                                                    <h1 class="text-xl font-semibold text-blurple-500">
                                                        {item.name === "Events" ? "" : "."}{prop.name}{item.name === "Methods" ? `(${prop.params?.map((m) => m.name).join(", ") || ""});` : ""}
                                                    </h1>
                                                    <ViewSource url={`${docs.sourceLink}/${tag}/${prop.meta.path}/${prop.meta.file}#L${prop.meta.line}`} />
                                                </div>

                                                <div class="prop-info">
                                                    {#if prop.description}
                                                        <p class="font-semibold text-lg">{@html markdown(prop.description)}</p>
                                                    {/if}
                                                    {#if prop.params}
                                                        <ParamsTable data={prop.params} />
                                                    {/if}
                                                    <div class="data-type">
                                                        {#if getName(prop)}
                                                            <h3 class="font-semibold text-lg">Scope: <Badge name={getName(prop)} /></h3>
                                                            {#if prop.type || prop.returns}
                                                                <!-- @todo add type links -->
                                                                <h3 class="font-semibold text-lg">{prop.type ? "Type" : "Returns"}: {(prop.type || prop.returns).flat(Infinity).join("")}</h3>
                                                            {/if}
                                                        {/if}
                                                    </div>
                                                </div>
                                            </div>
                                        {/each}
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}
                {/if}
            </div>
        </div>
    </div>
{:else}
    <Loader />
{/if}
<Footer />
