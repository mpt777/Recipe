<script lang="ts">
	import QuillDisplay from "$components/utils/form/QuillDisplay.svelte";

    export let recipe: RecipeInterface
</script>


<div class="relative">
    <div class="right-0 absolute">
        <a href="/recipe/{recipe._id}/edit" class="btn btn-sm variant-filled-tertiary">
            <i class="ri-pencil-line"></i> Edit
        </a>
    </div>
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold">{recipe.title}</h1>
    <div>
        <QuillDisplay value={recipe.description}/>
    </div>
</div>
