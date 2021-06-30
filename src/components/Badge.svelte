<script>
    export let name;
</script>

{#if name}
    <span class="bg-blurple-500 text-white p-1 text-center select-none rounded-md text-sm uppercase">{name}</span>
{/if}
