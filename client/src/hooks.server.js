// export const handleFetch = (async ({ request, fetch, event: { cookies } }) => {
//     if (request.url.startsWith("")) {
//         console.log("HERE");
//         request.headers.set('Authorization', `Bearer ${cookies.get('token')}`);
//     }
//     return fetch(request);
// })

export async function handleFetch({ request, fetch, event }) {
    //console.log(request);
    //console.log(fetch);
    //console.log(cookies)
    console.log("FUCK");

    console.log(request.url);
    console.log(event.cookies.get('authorization'));
    request.headers.set('Authorization', `Bearer ${event.cookies.get('authorization')}`);

    let x = await fetch(request);
    //console.log(await x)
    return x;
}