<script>
    export let name;
</script>

{#if name}
    <span class="{['deprecated', 'private'].includes(name) ? 'bg-red-400' : 'bg-primary'} text-white p-1 text-center select-none rounded-md text-sm uppercase">{name}</span>
{/if}
