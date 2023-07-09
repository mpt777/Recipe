import { setAuthToken } from "$utils/auth";
import { fail, redirect } from "@sveltejs/kit";
export async function load({ fetch }) {
    
}

export const actions = {
    default: async({ fetch, cookies, request}) => {
        const data = await request.formData();

        let jsonData = {};
        data.forEach((value, key) => jsonData[key] = value);

        const response = await fetch("http://server:3000/api/auth/login", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(jsonData)
        });


        let responseData = await response.json()

        if (response.ok){
            setAuthToken(cookies, responseData.token)
        }
        else {
            return fail(400, {message: responseData.message, level:"warning"})
        }

        return {success: true, message: responseData.message, level:"success"};
        //throw redirect(303, "/");
    }
}