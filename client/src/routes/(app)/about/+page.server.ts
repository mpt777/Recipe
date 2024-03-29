import { iapi } from '$utils/api';
import type { RequestEvent } from '@sveltejs/kit';

export async function load(event : RequestEvent) {
    let recipes = [];

    if (!event.locals.user){
        return {recipes: recipes}
    }

    try {
        const response = await iapi(`recipe/recipe?createdBy=${event.locals.user._id}`); // Make an API request
        recipes = await response.json();
    } catch (error) {
        console.error('API request failed:', error);
    }

    return {
        recipes: recipes
    };
}