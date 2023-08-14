import RecipeList from '$components/home/RecipeList.svelte';
import { Message, addMessage } from '$scripts/message';
import iapi from '$utils/iapi';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from "zod";

const recipeSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(1),
    ingredients: z.object({
        _id: z.string(),
        title: z.string().min(1),
        amount: z.coerce.number().positive(),
        unit: z.enum(["cup", "teaspoon","tablespoon","pint","quart","gallon","ounce","fluid ounce","pound","milliliter","liter","gram","kilogram"]),
        recipe: z.string(),
        delete: z.boolean().default(false),
      })
      .array().min(0)
})

export async function load(event) {
    let recipe = {};
    
    try {
        const response = await iapi(`recipe/${event.params.slug}`); // Make an API request
        recipe = await response.json();
    } catch (error) {
        console.error('API request failed:', error);
    }
    try {
        const response = await iapi(`ingredient/?recipe=${event.params.slug}`); // Make an API request
        recipe.ingredients = await response.json();
        console.log(recipe.ingredients)
    } catch (error) {
        console.error('API request failed:', error);
    }
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
                    await event.fetch(`http://server:3000/api/ingredient/${element._id}`, {
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
                let response = await event.fetch(`http://server:3000/api/ingredient/${element._id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(element),
                })
                form.data.ingredients[i] = await response.json()
            }
        })

        const response = await event.fetch(`http://server:3000/api/recipe/${event.params.slug}`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(form.data),
        })

        let recipe = await response.json();

        addMessage(event.cookies, new Message({message: "Recipe Saved"}));

        console.log("End Update")
        
        return { form };
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
