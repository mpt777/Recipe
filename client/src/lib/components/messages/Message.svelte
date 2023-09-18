<script>
    export let message = "";
    export let level = "";
</script>

{#if message}
<div class="alert variant-filled-{level}">
    {message}
</div>
{/if }