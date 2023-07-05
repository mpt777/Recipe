import setAuthToken from "$utils/auth";
import { fail, redirect } from "@sveltejs/kit";
export async function load({ fetch }) {
    
}

export const actions = {
    default: async({ fetch, cookies, request}) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');

        const response = await fetch("http://server:3000/api/auth/signup", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });


        console.log(request);
        let responseData = await response.json()

        if (response.ok){
            setAuthToken(cookies, responseData)
        }
        else {
            return fail(400, {"": responseData.message})
        }

        return {success: true};
        //throw redirect(303, "/");
    }
}