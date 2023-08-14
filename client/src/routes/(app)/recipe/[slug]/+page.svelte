<script lang="ts">
	import Recipe from "$components/recipe/Recipe.svelte";


    export let data;
    let recipe : RecipeInterface = data.recipe;

</script>

<div class="main-container">
    <Recipe recipe={recipe}/>
</div>