<script>
    export let message = "";
    export let level = "";
</script>

{#if message}
<div class="alert alert-{level}">
    {message}
</div>
{/if }