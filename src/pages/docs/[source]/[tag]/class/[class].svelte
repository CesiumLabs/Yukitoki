<script>
    import Sidebar from "~/components/Sidebar.svelte";
    import Navbar from "~/components/Navbar.svelte";
    import Footer from "~/components/Footer.svelte";
    import { params, goto, url } from "@roxi/routify";
    import DocsStore from "~/app/DocsStore";
    import Searchbar from "~/components/Searchbar.svelte";
    import Loader from "~/components/Loader.svelte";
    import Sources from "~/data/sources";
    import markdown from "~/app/Markdown";
    import ParamsTable from "~/components/ParamsTable.svelte";
    import Badge from "~/components/Badge.svelte";
    import ViewSource from "~/components/ViewSource.svelte";
    import Scroller from "./_scroller.svelte";
    import TypeLink from "~/components/TypeLink.svelte";

    const { source, tag, class: className } = $params;

    const docsSource = new DocsStore(Sources[source]);
    let docs = null,
        content = null;

    if (!docs) {
        docsSource.fetchDocs().then((doc) => {
            doc = doc.find((x) => x.tag === tag);
            docs = doc.classes.find((c) => c.name === className);
            if (!docs) content = "# Docs not found!";
            docs.globalName = doc.global;
            docs.sourceLink = docsSource.manager.source;
        });
    }

    function getName(item) {
        let props = [];
        if (item.readonly) props.push("readonly");
        if (item.async) props.push("async");
        if (item.abstract) props.push("abstract");
        if (item.deprecated) props.push("deprecated");
        if ("access" in item && item.access?.length) props.push(item.access);
        if ("scope" in item && item.scope?.length) props.push(item.scope);

        return props;
    }

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

    function navigate(id, scroll = true) {
        $goto(`${$url()}?scrollTo=${id}`);
        if (scroll) scrollToProp(id);
        else document.getElementById(`scroll-prop-${id}`)?.scrollIntoView(true);
    }
</script>

<Navbar />
{#if docs}
    <Scroller />
    <div class="text-base-content  bg-base-100  pt-3 w-full" id="relativeContainer">
        <Searchbar docs={docsSource.docs} />

        <div class="lg:flex mx-auto w-full max-w-screen-2xl">
            <Sidebar data={docsSource.docs} />
            <div class="porse break-words mx-auto py-16 px-4 sm:px-8 lg:py-8 w-full max-w-4xl lg:max-w-7xl">
                {#if content !== null}
                    {@html markdown(content)}
                {:else}
                    <div class="class-constructor-info">
                        <div class="flex">
                            <h1 class="text-3xl  text-base-content font-bold">{docs.construct?.name ?? docs.name}</h1>
                            <ViewSource url={`${docs.sourceLink}/${tag}/${docs.meta.path}/${docs.meta.file}#L${docs.meta.line}`} />
                        </div>
                        <span class="text-md ">{@html docs.construct?.description ?? ""}</span>
                        <div class="construct">
                            {@html markdown(`\`\`\`js\nnew ${docs.globalName ? `${docs.globalName}.` : ""}${docs.construct?.name ?? docs.name}(${docs.construct?.params?.map((m) => m.name).join(", ") ?? ""});\n\`\`\``)}
                            {#if docs.construct?.params?.length}
                                <div class="mt-6">
                                    <ParamsTable data={docs.construct.params} docs={docsSource.docs} />
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
                                            <li on:click={() => navigate(prop.name)} style="list-style-type:none;" class="cursor-pointer text-lg text-primary hover:text-primary-focus hover:border-primary px-2 font-semibold border-l-2">
                                                {prop.name}
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
                                            <div id="scroll-prop-{prop.name}" class="py-3">
                                                <div class="flex">
                                                    <h1 class="text-xl font-semibold text-primary hover:text-primary-focus cursor-pointer" on:click={() => navigate(prop.name, false)}>
                                                        {item.name === "Events" ? "" : "."}{prop.name}{item.name === "Methods" ? `(${prop.params?.map((m) => m.name).join(", ") || ""});` : ""}
                                                    </h1>
                                                    <ViewSource url={`${docs.sourceLink}/${tag}/${prop.meta.path}/${prop.meta.file}#L${prop.meta.line}`} />
                                                </div>

                                                <div class="prop-info">
                                                    {#if prop.description}
                                                        <p class="font-semibold text-lg">{@html markdown(prop.description)}</p>
                                                    {/if}
                                                    {#if prop.params}
                                                        <ParamsTable data={prop.params} docs={docsSource.docs} />
                                                    {/if}
                                                    <div class="data-type">
                                                        {#if getName(prop).length}
                                                            <h3 class="font-semibold text-lg">
                                                                Scope: <span class="space-x-2">
                                                                    {#each getName(prop) as scopeName}
                                                                        <Badge name={scopeName} />
                                                                    {/each}
                                                                </span>
                                                            </h3>
                                                        {/if}
                                                        {#if prop.type || (prop.returns ? prop.returns : !prop.type ? (prop.returns = ["void"]) : false)}
                                                            <div class="font-semibold text-lg inline-flex space-x-1">
                                                                <h1>{prop.type ? "Type" : "Returns"}:</h1>
                                                                <TypeLink docs={docsSource.docs} {prop} meta={$params} />
                                                            </div>
                                                        {/if}
                                                        {#if prop.examples && prop.examples.length}
                                                            <h3 class="font-semibold text-lg">Examples:</h3>
                                                            {#each prop.examples as example}
                                                                <div class="my-3">
                                                                    {@html markdown(`\`\`\`js\n${example}\n\`\`\``)}
                                                                </div>
                                                            {/each}
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
