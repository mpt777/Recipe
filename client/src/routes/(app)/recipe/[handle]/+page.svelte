<script lang="ts">
	import Recipe from "$components/recipe/Recipe.svelte";

    export let data;
    let recipe : RecipeInterface = data.recipe;

</script>

<svelte:head>
	<title>{recipe.title}</title>
</svelte:head>

<div class="main-container">
    <Recipe recipe={recipe}/>
</div>