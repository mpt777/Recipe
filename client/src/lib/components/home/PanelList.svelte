<script>
    import { onMount } from "svelte";
    import iapi from "$utils/iapi";

	let recipes = []
    /*[
        {
            "title":"Avacado Toast",
            "description":"Avacados used to mean balls"
        },
        {
            "title":"Pizza",
            "description":"YOu want this and that"
        }
    ];
    */

    onMount(async () => {
        get();
    });

    async function get() {
        try {
            const response = await iapi('recipe'); // Make an API request
            recipes = await response.json();

            // const response = await api.get('recipe'); // Make an API request
            //recipes = response.data;
        } catch (error) {
            console.error('API request failed:', error);
        }
    }

</script>

<div class="main-container">
{#each recipes as recipe, i}
    <!-- <Panel recipe={recipe} /> -->

    <a href="recipe/{recipe._id}">
        <div class="border border-gray-300 bg-white rounded-lg shadow-lg p-4">
            <h2 class="text-xl font-semibold mb-4">{recipe.title}</h2>
            <p class="text-gray-700">{recipe.description}</p>
        </div>
    </a>
{/each}
</div>