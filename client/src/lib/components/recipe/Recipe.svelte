<script lang="ts">
	import QuillDisplay from "$components/utils/form/QuillDisplay.svelte";

    import { page } from '$app/stores';
	import IngredientCheck from "./IngredientCheck.svelte";
	import { fractionalize, pluralize } from "$scripts/humanize";

    export let recipe: RecipeInterface
    
</script>


<div class="relative">
    {#if $page.data.user && $page.data.user._id === recipe.createdBy._id}
    <div class="right-0 absolute">
        <a href="/recipe/{recipe._id}/edit" class="btn btn-sm variant-filled-tertiary">
            <i class="ri-pencil-line"></i> Edit
        </a>
    </div>
    {/if}
    <div class="space-y-4">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold">{recipe.title}</h1>
        <QuillDisplay value={recipe.description}/>

        <h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold">Ingredients</h2>
        <ul class="list">
        {#each recipe.ingredients || [] as ingredient }
            <li>
                <IngredientCheck title="{fractionalize(ingredient.amount)} {pluralize(ingredient.unit, ingredient.amount)} {ingredient.title}" />
            </li>
        {/each}
        </ul>

        
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-extrabold">Instructions</h2>
        <QuillDisplay value={recipe.instructions}/>
    </div>
</div>
