<script lang="ts">
    import { onMount } from "svelte";
    import iapi from "$utils/iapi";
	import { Avatar } from "@skeletonlabs/skeleton";
    import { humanizeDate } from "$scripts/date";
	import QuillDisplay from "$components/form/QuillDisplay.svelte";
    import RecipeTags from "$components/recipe/RecipeTags.svelte";
	import Recipe from "$components/recipe/Recipe.svelte";
	import Image from "$components/image/Image.svelte";

	export let recipes: RecipeInterface[];

    onMount(async () => {
        if (!recipes) {
            get();
        }
    });

    async function get() {
        try {
            const response = await iapi(`recipe/recipe`); // Make an API request
            recipes = await response.json();
        } catch (error) {
            console.error('API request failed:', error);
        }
    }

    // let cRecipe = new Recipe(recipe)

</script>

<div class="p-4">
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#if recipes?.length > 0}
        {#each recipes as recipe, i}
            <!-- <Panel recipe={recipe} /> -->
            <a href="recipe/{recipe.handle || recipe._id}" class="card bg-initial card-hover overflow-hidden">
                <div class="h-full flex flex-col">
                    <header class="card-header p-0">
                            <Image image={recipe.image} css="max-h-64 w-full object-cover"/>
                    </header>
                    <section class="p-4 h-full">
                        <div class="flex justify-between flex-wrap">
                            <h3 class="h3">{recipe.title}</h3>
                            <RecipeTags tags={recipe.tags}/>
                        </div>

                        <article>
                            <div class="max-h-40 overflow-hidden text-ellipsis">
                                <QuillDisplay value={recipe.description} />
                            </div>
                        </article>
                    </section>
                    <hr class="opacity-50">
                    <footer class="p-4 flex justify-between items-center space-x-4">
                        <div>{humanizeDate(new Date(recipe.createdAt))}</div>
                        <div>
                            <Avatar
                                initials={recipe.createdBy.username.charAt(0)}
                                cursor="cursor-pointer"
                                width="w-12"
                            />
                        </div>
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