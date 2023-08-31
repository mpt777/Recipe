<script lang="ts">
    export let tags: TagInterface[] | undefined;
    export let css= "";
</script>

<div class="flex gap-2 {css}">
    {#each (tags || []) as tag, _}
        <a href="/explore?tag={tag.name}">
            <span class="chip variant-soft hover:variant-filled">{tag.name}</span>
        </a>
    {/each}
</div>