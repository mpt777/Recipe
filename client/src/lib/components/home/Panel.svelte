<script>

    import api from "$utils/api";

	export let recipe = {
        "title":"Pizza",
        "description":"YOu want this and that",
        "id":""
    };

    async function remove(item, i) {
      await api.delete("recipe/" + item._id);
      recipes.splice(i, 1);
    }

</script>

<div class="border border-gray-300 bg-white rounded-lg shadow-lg p-4">
    <h2 class="text-xl font-semibold mb-4">{recipe.title}</h2>
    <p class="text-gray-700">{recipe.description}</p>
    <button on:click={remove}>Delete</button>
</div>