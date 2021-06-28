<script>
    import Loader from "~/components/Loader.svelte";
    import Navbar from "~/components/Navbar.svelte";
    import Footer from "~/components/Footer.svelte";
    import MainSource from "~/data/MainSource";
    import DocsStore from "~/app/DocsStore";
    import { goto } from "@roxi/routify";

    const docsSource = new DocsStore(MainSource);

    docsSource.fetchDocs().then(() => {
        $goto(`/docs/${docsSource.manager.id}/${docsSource.manager.defaultTag}/${docsSource.manager.defaultFile.category}/${docsSource.manager.defaultFile.id}`);
    });
</script>

<Navbar />

<Loader />

<Footer />
