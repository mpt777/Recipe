<script lang="ts">
    export let image : ImageInterface | undefined;
    export let css : "";
</script>


{#if image}
    <img src="/api/common/image/file/{image._id}" alt="{image.alt}" class={css}>
{/if}
