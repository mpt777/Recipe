<script>
    import { onMount } from "svelte";
    import iapi from "$utils/iapi";
    import api from "$utils/api";
    import Panel from '$components/home/Panel.svelte';

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

    let title = "";
    let description = "";

    onMount(async () => {
        get();
    });

    async function get() {
        try {
            const response = await iapi('recipe/recipe'); // Make an API request
            recipes = await response.json();

            // const response = await api.get('recipe'); // Make an API request
            //recipes = response.data;
        } catch (error) {
            console.error('API request failed:', error);
        }
    }
    async function add(e) {
      e.preventDefault();
      const response = await api.post("recipe", {
        title: title,
        description: description
      });
      recipes.push(response.data);
      recipes = recipes;
      title = "";
      description = "";
    }

    async function remove(item, i) {
        //await api.delete("recipe/" + item._id);
        await iapi("recipe/recipe/" + item._id, {
            method:"DELETE"
        })
        recipes.splice(i, 1);
        recipes = recipes;
    }


</script>

{#each recipes as recipe, i}
    <!-- <Panel recipe={recipe} /> -->

    <div class="border border-gray-300 bg-white rounded-lg shadow-lg p-4">
        <h2 class="text-xl font-semibold mb-4">{recipe.title}</h2>
        <p class="text-gray-700">{recipe.description}</p>
        <button on:click={() => remove(recipe, i)}>Delete</button>
    </div>
{/each}

<div>
    <form class="form" >
        <input class="input" bind:value={title} type="text" name="name" placeholder="Enter todo" />
        <br />
        <input class="input" bind:value={description} type="text" name="description"  placeholder="Enter Description" />
        <br />
        <button class="submit-button btn--accent" on:click="{add}">Add Todos</button>
    </form>
    {title}
    {description}
</div>

