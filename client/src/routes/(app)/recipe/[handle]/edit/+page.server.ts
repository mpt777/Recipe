
import { recipeSchema } from '$lib/forms/recipe.form';
import { Message, addMessage } from '$scripts/message';
import iapi from '$utils/iapi';
import { error, fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

export async function load(event) {

    if (!event.locals.user){
        throw error(403, "You must be logged in to edit recipes")
    }

    let recipe : RecipeInterface = null!;
    
    try {
        const response = await iapi(`recipe/recipe/${event.params.handle}`); // Make an API request
        recipe = await response.json();
    } catch (error) {
        console.error('API request failed:', error);
    }

    if (event.locals.user._id !== recipe.createdBy._id){
        throw error(403, "You cannot edit other people's recipies")
    }

    recipe.tags = recipe.tags?.map(e => e.name)

    let recipeForm = { ...recipe}
    recipeForm.image = recipe.image._id || "";
    
    const form = await superValidate(recipeForm, recipeSchema)

    let breadcrumbs = [
        {"link":"/", "label": "Home"},
        {"link": `/recipe/${recipe._id}`, "label": recipe.title},
        {"link":"", "label": "Edit"},
    ]

    return { form, recipe, breadcrumbs};
}
export const actions = {
    update: async(event) => {
        const formData = await event.request.formData();

        const file = formData.get("image");

        let form = await superValidate(formData, recipeSchema)

        if (!form.valid){
            return fail(400, { form })
        }

        let ingredients = form.data.ingredients;

        const response = await event.fetch(`http://server:3000/api/recipe/recipe/${event.params.handle}`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(form.data),
        })

        if (response.ok) {
            addMessage(event.cookies, new Message({message: "Recipe Saved"}));
            form.data = {...await response.json(), ...form.data};
        } else {
            addMessage(event.cookies, new Message({message: "Error With Saving", background: "variant-filled-error"}));

            let error = await response.json();
            if (error?.error == "unique") {
                return setError(form, error.field, `${error.field} already exists.`);
            }
        }

        form.data.ingredients.forEach(async (element, i) => {
            if (element.delete) {
                if (element._id) {
                    element.recipe = event.params.handle;
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
                element.recipe = event.params.handle;
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
        
        return { form };
    },
    delete: async({request, params, fetch, cookies}) => {

        const response = await fetch(`http://server:3000/api/recipe/recipe/${params.handle}`, {
            method: "DELETE",
        })

        addMessage(cookies, new Message({message: "Recipe Deleted"}));
        throw redirect(302, "/profile");

        return { success: true }
    },
}
