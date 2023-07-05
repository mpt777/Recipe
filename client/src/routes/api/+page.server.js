import setAuthToken from "$utils/auth";
import { fail, redirect } from "@sveltejs/kit";

export async function load({ request, fetch }) {
    //console.log("API")
    //console.log(request)

    // console.log(request.url)
    // console.log("456")

    if (request.url.startsWith('http://localhost:8080/api')) {
        // clone the original request, but change the URL
        console.log("Switch")
        request = new Request(
            request.url.replace('http://localhost:8080/api', 'http://server:3000/api/recipe'),
            request
        );
    }

    return fetch(request)
    // console.log(await x.json())
    // return x;
}