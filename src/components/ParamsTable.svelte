<script>
    import markdown from "~/app/Markdown";
    import { FontAwesomeIcon } from "fontawesome-svelte";
    import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
    import TypeLink from "~/components/TypeLink.svelte";
    import { params } from "@roxi/routify";

    export let data, docs;
</script>

<div class="border-l-2 hover:border-primary transition overflow-y-auto">
    <table class="table-auto mx-2 my-3">
        <thead class="justify-between">
            <tr class="bg-primary text-white">
                <th class="px-16 py-2">
                    <span>PARAMETER</span>
                </th>
                <th class="px-16 py-2">
                    <span>TYPE</span>
                </th>
                {#if data.some((x) => !!x.optional)}
                    <th class="px-16 py-2">
                        <span>OPTIONAL</span>
                    </th>
                {/if}
                {#if data.some((x) => !!x.default)}
                    <th class="px-16 py-2">
                        <span>DEFAULT</span>
                    </th>
                {/if}
                <th class="px-16 py-2">
                    <span>DESCRIPTION</span>
                </th>
            </tr>
        </thead>
        <tbody class="text-base-content   bg-base-200 text-center font-medium">
            {#each data as m}
                <tr>
                    <td>
                        <span>{m.name}</span>
                    </td>
                    <td class="px-16 py-2 font-semibold">
                        <TypeLink prop={m} meta={$params} {docs} />
                    </td>
                    {#if data.some((x) => !!x.optional)}
                        <td>
                            {#if m.optional}
                                <span><FontAwesomeIcon icon={faCheck} /></span>
                            {:else}
                                <span><FontAwesomeIcon icon={faTimes} /></span>
                            {/if}
                        </td>
                    {/if}
                    {#if data.some((x) => !!x.default)}
                        <td>
                            <span>{m.default || ""}</span>
                        </td>
                    {/if}
                    <td class="px-16 py-2">
                        {@html markdown(m.description)}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
