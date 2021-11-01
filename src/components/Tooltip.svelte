<script>
    export let text, display;
</script>

<div class="absolute my-auto {display ? '' : 'hidden'} mx-auto w-full">
    <span class="bg-base-200 text-base-content text-lg rounded py-1 px-4 right-0">
        {text || ""}
    </span>
</div>
