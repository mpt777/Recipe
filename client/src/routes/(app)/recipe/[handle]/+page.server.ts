import RecipeList from '$components/home/RecipeList.svelte';
import iapi from '$utils/iapi';

export async function load({ params }) {
    
    let recipe : RecipeInterface;
    console.log(params.handle)
    try {
        const response = await iapi(`recipe/recipe/${params.handle}`); // Make an API request
        recipe = await response.json();
    } catch (error) {
        console.error('API request failed:', error);
    }

    return {
        recipe: recipe
    };
}