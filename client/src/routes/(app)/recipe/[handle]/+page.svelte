<script lang="ts">
	import Recipe from "$components/recipe/Recipe.svelte";
	import Breadcrumb from "$components/utils/Breadcrumb.svelte";


    export let data;
    let recipe : RecipeInterface = data.recipe;
    let breadcrumbs = [
        {"link":"/", "label": "Home"},
        {"link":"/", "label": recipe.title},
    ]

</script>

<svelte:head>
	<title>{recipe.title}</title>
</svelte:head>

<div class="main-container">
    <Breadcrumb breadcrumbs={breadcrumbs}/>
    <Recipe recipe={recipe}/>
</div>