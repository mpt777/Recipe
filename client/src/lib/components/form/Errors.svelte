<script>
    export let error = "" || null;
</script>

{#if error}
<p class="text-red-500 text-xs italic mt-3">{error}</p>
{/if}