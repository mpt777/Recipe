<script lang="ts">
	import QuillDisplay from "$components/form/QuillDisplay.svelte";
    export let recipe : RecipeInterface; 
    import Image from "$components/image/Image.svelte"
	import RecipeTags from "$components/recipe/RecipeTags.svelte";
	import { humanizeDate } from "$scripts/date";
	import { Avatar } from "@skeletonlabs/skeleton";
</script>

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