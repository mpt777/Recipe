import RecipeList from '$components/home/RecipeList.svelte';
import iapi from '$utils/iapi';

export async function load({ params }) {
    
    let recipe : RecipeInterface;
    
    try {
        const response = await iapi(`recipe/${params.slug}`); // Make an API request
        recipe = await response.json();
    } catch (error) {
        console.error('API request failed:', error);
    }

    return {
        recipe: recipe
    };
}