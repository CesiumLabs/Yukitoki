<script>
    export let text, display;
</script>

<div class="absolute my-auto {display ? '' : 'hidden'} mx-auto w-full">
    <span class="bg-black text-white text-lg rounded py-1 px-4 right-0">
        {text || ""}
    </span>
</div>
