import { fail, redirect } from "@sveltejs/kit";
import { setAuthToken } from "$utils/auth";

export async function loginUser(event){
    const data = await event.request.formData();
    
    let jsonData = {};
    data.forEach((value, key) => jsonData[key] = value);

    const response = await event.fetch("http://server:3000/api/auth/login", {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(jsonData)
    });

    
    let responseData = await response.json()


    if (response.ok){
        setAuthToken(event.cookies, responseData.token)
    }
    else {
        return fail(400, {message: responseData.message, level:"warning"})
    }

    const redirectTo = event.url.searchParams.get("redirectTo")
    if (redirectTo) {
        throw redirect(302,`/${redirectTo.slice(1)}`)
    }
    return {success: true, message: responseData.message, level:"success"};
}

export async function signupUser(event){
    const data = await event.request.formData();

    let jsonData = {};
    data.forEach((value, key) => jsonData[key] = value);

    const response = await event.fetch("http://server:3000/api/auth/signup", {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(jsonData)
    });


    let responseData = await response.json()

    if (response.ok){
        setAuthToken(event.cookies, responseData.token)
    }
    else {
        return fail(400, {"message": responseData.message})
    }

    return {success: true};
}

export function logoutUser(){

}