import RecipeList from '$components/home/RecipeList.svelte';
import { Message, addMessage } from '$scripts/message';
import iapi from '$utils/iapi';
import { redirect } from '@sveltejs/kit';

export async function load({ url, params }) {
    let recipe = {};
    
    try {
        const response = await iapi(`recipe/${params.slug}`); // Make an API request
        recipe = await response.json();
        // console.log(recipe)
    } catch (error) {
        console.error('API request failed:', error);
    }

    return {
        recipe: recipe
    };
}
export const actions = {
    update: async({request, params, fetch, cookies}) => {
        const formData = await request.formData()

        const response = await fetch(`http://server:3000/api/recipe/${params.slug}`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        })

        let recipe = await response.json();
        addMessage(cookies, new Message({message: "Recipe Saved"}));
        
        return { success: true, recipe: recipe }
    },
    delete: async({request, params, fetch, cookies}) => {

        // const response = await fetch(`http://server:3000/api/recipe/${params.slug}`, {
        //     method: "DELETE",
        // })

        addMessage(cookies, new Message({message: "Recipe Deleted"}));
        throw redirect(302, "/profile");

        return { success: true }
    },
}
