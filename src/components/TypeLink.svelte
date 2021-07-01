<script>
    // @todo: Fix types
    import Util from "~/app/Util";

    export let docs, prop, meta;

    const types = prop.type || prop.returns;
</script>

<div class="inline-flex space-x-0 typelink">
    {#each types.flat(Infinity).map((m) => Util.getPath(m, docs, meta)) as type}
        {#if type.link}
            <a class="text-blurple-500 hover:text-blurple-600 cursor-pointer" href={type.link} target={type.external ? "_blank" : "_self"}>{type.text}</a>
        {:else}
            <p class="text-black dark:text-white">{type.text}</p>
        {/if}
    {/each}
</div>
