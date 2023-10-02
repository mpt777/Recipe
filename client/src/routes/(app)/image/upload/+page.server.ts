
import { imageSchema, recipeSchema } from '$lib/forms/recipe.form';
import { Message, addMessage } from '$scripts/message';
import iapi from '$utils/iapi';
import { error, fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const actions = {
    update: async(event) => {
        const formData = await event.request.formData();

        console.log(formData)

        let form = await superValidate(formData, imageSchema)

        if (!form.valid){
            return fail(400, { form })
        }

        const response = await event.fetch(`http://server:3000/api/common/image/upload`, {
            method: "post",
            body: formData,
        })
        
        return { form };
    },
}
