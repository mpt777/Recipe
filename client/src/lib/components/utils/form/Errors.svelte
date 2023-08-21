<script>
    export let error = ""
</script>

{#if error}
<p class="text-red-500 text-xs italic mt-3">{error}</p>
{/if}