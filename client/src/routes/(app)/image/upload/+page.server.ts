
import { imageSchema, recipeSchema } from '$lib/forms/recipe.form';
import { Message, addMessage } from '$scripts/message';
import { papi } from '$utils/api';
import { error, fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

export const actions = {
    update: async(event) => {
        const formData = await event.request.formData();

        let form = await superValidate(formData, imageSchema)

        if (!form.valid){
            return fail(400, { form })
        }

        const response = await papi(event.fetch, `common/image/upload`, {
            method: "post",
            body: formData,
        })
        
        return { form };
    },
}
