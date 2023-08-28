
import { recipeSchema } from '$lib/forms/recipe.form';
import { Message, addMessage } from '$scripts/message';
import iapi from '$utils/iapi';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export async function load(event) {

    if (!event.locals.user){
        throw error(403, "You must be logged in to edit recipes")
    }

    let recipe : RecipeInterface = null!;
    
    try {
        const response = await iapi(`recipe/recipe/${event.params.slug}`); // Make an API request
        recipe = await response.json();
    } catch (error) {
        console.error('API request failed:', error);
    }

    if (event.locals.user._id !== recipe.createdBy._id){
        throw error(403, "You cannot edit other people's recipies")
    }

    console.log(recipe.tags)
    recipe.tags = recipe.tags?.map(e => e.name)
    console.log(recipe)

    const form = await superValidate(recipe, recipeSchema)


    return { form, recipe };
}
export const actions = {
    update: async(event) => {
        let form = await superValidate(event, recipeSchema)

        if (!form.valid){
            return fail(400, { form })
        }

        form.data.ingredients.forEach(async (element, i) => {
            if (element.delete){
                if (element._id) {
                    element.recipe = event.params.slug;
                    await event.fetch(`http://server:3000/api/recipe/ingredient/${element._id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type":"application/json"
                        },
                    }) 
                    
                }
                form.data.ingredients.splice(i, 1);
            }
            else {
                element.recipe = event.params.slug;
                let response = await event.fetch(`http://server:3000/api/recipe/ingredient/${element._id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(element),
                })
                form.data.ingredients[i] = await response.json()
            }
        })

        const response = await event.fetch(`http://server:3000/api/recipe/recipe/${event.params.slug}`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(form.data),
        })

        let recipe = await response.json();
        console.log(recipe)

        addMessage(event.cookies, new Message({message: "Recipe Saved"}));

        console.log("End Update")
        
        return { form };
    },
    delete: async({request, params, fetch, cookies}) => {

        const response = await fetch(`http://server:3000/api/recipe/recipe/${params.slug}`, {
            method: "DELETE",
        })

        addMessage(cookies, new Message({message: "Recipe Deleted"}));
        throw redirect(302, "/profile");

        return { success: true }
    },
}
