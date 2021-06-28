<script>
    import Sidebar from "~/components/Sidebar.svelte";
    import Navbar from "~/components/Navbar.svelte";
    import Footer from "~/components/Footer.svelte";
    import { params } from "@roxi/routify";
    import DocsStore from "~/app/DocsStore";
    import Searchbar from "~/components/Searchbar.svelte";
    import Loader from "~/components/Loader.svelte";
    import Sources from "~/data/sources";

    const { source, tag, category, file } = $params;
    const docsSource = new DocsStore(Sources[source]);
    let docs = null;

    docsSource.fetchDocs().then((doc) => {
        docs = doc.find((x) => x.tag === tag);

        console.log(docs);
    });
</script>

<Navbar />
{#if docs}
    <div class="text-gray-800 dark:text-white bg-white dark:bg-gray-800 pt-3 w-full">
        <Searchbar />

        <div class="lg:flex mx-auto w-full max-w-screen-2xl">
            <Sidebar data={docs} />
        </div>
    </div>
{:else}
    <Loader />
{/if}
<Footer />
