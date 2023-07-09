import { setAuthToken } from "$utils/auth";
import { fail, redirect } from "@sveltejs/kit";

// proxy for authenticated requests
function replaceAPI(request){
    if (request.url.startsWith('http://localhost:8080/api')) {
        // clone the original request, but change the URL
        request = new Request(
            request.url.replace('http://localhost:8080/api', 'http://server:3000/api'),
            request
        );
    }
    return request
}

export async function GET({ request, fetch }) {
    request = replaceAPI(request);

    let x = await fetch(request);
    return x
}

export async function POST({ request, fetch }) {
    request = replaceAPI(request);

    let x = await fetch(request);
    return x
}

export async function DELETE({ request, fetch }) {
    request = replaceAPI(request);

    let x = await fetch(request);
    return x
}