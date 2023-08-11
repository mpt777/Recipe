<script>
	import { page } from "$app/stores";
	import RecipeList from "$components/home/RecipeList.svelte";

</script>


<div class="main-container">
    <RecipeList recipes={$page.data.recipes}/>
    
    <form method="POST" action="/recipe/add">
        <button class="w-full variant-filled-primary btn">Add New Recipe</button>
    </form>
</div>

