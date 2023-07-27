import { redirect } from '@sveltejs/kit';

export const actions = {
    update: async(event) => {
        const data = await event.request.formData();
    
        let jsonData = {};
        data.forEach((value, key) => jsonData[key] = value);
    
        console.log(data)
        
        const response = await event.fetch("http://server:3000/api/recipe", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(jsonData)
        });
    
        
        let responseData = await response.json()
        console.log(responseData)
    
        if (response.ok){
            throw redirect(302, `/recipe/${responseData.id}`)
        }
        else {
            return fail(400, {message: responseData.message, level:"warning"})
        }
    },
    delete: async(event) => {

    }
}