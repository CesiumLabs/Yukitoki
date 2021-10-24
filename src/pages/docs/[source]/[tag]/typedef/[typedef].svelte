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
    import ViewSource from "~/components/ViewSource.svelte";
    import TypeLink from "~/components/TypeLink.svelte";

    const { source, tag, typedef } = $params;

    const docsSource = new DocsStore(Sources[source]);
    let docs = null,
        content = null;

    docsSource.fetchDocs().then((doc) => {
        doc = doc.find((x) => x.tag === tag);
        docs = doc.typedefs.find((c) => c.name === typedef);
        docs.globalName = doc.global;
        docs.sourceLink = docsSource.manager.source;

        if (!docs) content = "# Docs not found!";
    });
</script>

<Navbar />
{#if docs}
    <div class="text-base-content  bg-base-100  pt-3 w-full">
        <Searchbar docs={docsSource.docs} />

        <div class="lg:flex mx-auto w-full max-w-screen-2xl">
            <Sidebar data={docsSource.docs} />
            <div class="porse break-words mx-auto py-16 px-4 sm:px-8 lg:py-8 w-full max-w-4xl lg:max-w-7xl">
                {#if content !== null}
                    {@html markdown(content)}
                {:else}
                    <div class="flex">
                        <h1 class="text-3xl  text-base-content font-bold">{docs.name}</h1>
                        <ViewSource url={`${docs.sourceLink}/${tag}/${docs.meta.path}/${docs.meta.file}#L${docs.meta.line}`} />
                    </div>
                    <span class="text-md ">{@html docs.description ?? ""}</span>
                    <div>
                        {#if docs.props}
                            <ParamsTable data={docs.props} docs={docsSource.docs} />
                        {/if}
                        {#if docs.type}
                            <div class="font-semibold text-lg inline-flex space-x-1">
                                <h1>Type:</h1>
                                <TypeLink docs={docsSource.docs} prop={docs} meta={$params} />
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        </div>
    </div>
{:else}
    <Loader />
{/if}
<Footer />
