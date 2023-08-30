<script lang="ts">
	import Recipe from "$components/recipe/Recipe.svelte";
	import Breadcrumb from "$components/utils/Breadcrumb.svelte";


    export let data;
    let recipe : RecipeInterface = data.recipe;
    let breadcrumbs = [
        {"link":"Home", "label": "Home"},
        {"link":"/", "label": recipe.title},
    ]

</script>

<div class="main-container">
    <Breadcrumb breadcrumbs={breadcrumbs}/>
    <Recipe recipe={recipe}/>
</div>