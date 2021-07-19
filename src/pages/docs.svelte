<script>
    import Loader from "~/components/Loader.svelte";
    import Navbar from "~/components/Navbar.svelte";
    import Footer from "~/components/Footer.svelte";
    import YukitokiSource from "~/data/YukitokiSource";
    import DocsStore from "~/app/DocsStore";
    import Sources from "~/data/sources";
    import { goto } from "@roxi/routify";

    const docsSource = new DocsStore(YukitokiSource);

    Promise.all(Object.values(Sources).map((m) => new DocsStore(m).fetchDocs())).then(() => {
        $goto(`/docs/${docsSource.manager.id}/${docsSource.manager.defaultTag}/${docsSource.manager.defaultFile.category}/${docsSource.manager.defaultFile.id}`);
    });
</script>

<Navbar />

<Loader />

<Footer />
