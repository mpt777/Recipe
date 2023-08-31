import { page } from '$app/stores';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    // update: async(event) => {
    //     const data = await event.request.formData();
    
    //     let jsonData = {};
    //     data.forEach((value, key) => jsonData[key] = value);
    
    //     console.log(data)
        
    //     const response = await event.fetch("http://server:3000/api/recipe", {
    //         method: "POST",
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         body: JSON.stringify(jsonData)
    //     });
    
        
    //     let responseData = await response.json()
    //     console.log(responseData)
    
    //     if (response.ok){
    //         throw redirect(302, `/recipe/${responseData.id}`)
    //     }
    //     else {
    //         return fail(400, {message: responseData.message, level:"warning"})
    //     }
    // },
    // delete: async(event) => {

    // },
    default: async(event) => {
        if (!event.locals.user){
            return fail(400, {message: "Must be logged in to add recipe", level:"warning"})
        }
        const response = await event.fetch("http://server:3000/api/recipe/recipe", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "createdBy": event.locals.user._id
            })
        });
        let responseData = await response.json()
    
        if (response.ok){
            throw redirect(302, `/recipe/${responseData._id}/edit`)
        }
        else {
            return fail(400, {message: responseData.message, level:"warning"})
        }
    },
}