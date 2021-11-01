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

    const { source, tag, category, file } = $params;

    const docsSource = new DocsStore(Sources[source]);
    let docs = null,
        content = "";

    docsSource.fetchDocs().then((doc) => {
        docs = doc.find((x) => x.tag === tag);
        let fileData = docs.custom[category]?.files[file];

        if (!fileData) return void (content = "# File not found!");

        if (fileData.type === "md") content = fileData.content;
        else content = `# ${fileData.name}\n\`\`\`${fileData.type}\n${fileData.content}\n\`\`\``;
    });
</script>

<Navbar />
{#if docs}
    <div class="text-base-content  bg-base-100  pt-3 w-full">
        <Searchbar docs={docsSource.docs} />

        <div class="lg:flex mx-auto w-full max-w-screen-2xl">
            <Sidebar data={docsSource.docs} />
            <div class="porse break-words mx-auto py-16 px-4 sm:px-8 lg:py-8 w-full max-w-4xl lg:max-w-7xl">{@html markdown(content)}</div>
        </div>
    </div>
{:else}
    <Loader />
{/if}
<Footer />
