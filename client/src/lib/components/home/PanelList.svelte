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

<div class="p-4">
    <section class="grid grid-cols-2 md:grid-cols-3 gap-4">
    {#if recipes.length > 0}
        {#each recipes as recipe, i}
            <!-- <Panel recipe={recipe} /> -->
            <a href="recipe/{recipe._id}" class="card bg-initial card-hover overflow-hidden">
                <div class="">
                    <header class="card-header">
                        
                    </header>
                    <section class="p-4">
                        <h3 class="h3">{recipe.title}</h3>
                        <article>
                            <p>{recipe.description}</p>
                        </article>
                    </section>
                    <hr class="opacity-50">
                    <footer class="p-4 flex justify-start items-center space-x-4">
                        (footer)
                    </footer>
                </div>
            </a>
        {/each}

    {:else }
        {#each [0,0,0] as recipe, i}
        <section class="card w-full">
            <div class="p-4 space-y-4">
                <div class="placeholder" />
                <div class="grid grid-cols-3 gap-8">
                    <div class="placeholder" />
                    <div class="placeholder" />
                    <div class="placeholder" />
                </div>
                <div class="grid grid-cols-4 gap-4">
                    <div class="placeholder" />
                    <div class="placeholder" />
                    <div class="placeholder" />
                    <div class="placeholder" />
                </div>
            </div>
        </section>
        {/each}
    {/if}
    </section>
</div>