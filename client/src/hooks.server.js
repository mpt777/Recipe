import { redirect } from '@sveltejs/kit'

export async function handle({ event, resolve }) {
    // get cookies from browser
    const authToken = event.cookies.get('Authorization')

    if (authToken) {
      // get user from endpoint
      const response = await event.fetch("http://server:3000/api/auth/user/current");
      const user = await response.json()
    
      // // if `user` exists set `events.local`
      if (user) {
        event.locals.user = user
      }
    }

    if (event.url.pathname.startsWith("/profile")) {
      if (!event.locals.user){
        throw redirect(303, "/")
      }
    }
    if (event.url.pathname.startsWith("/admin")) {
      if (!event.locals.user){
        throw redirect(303, "/")
      }
    }
  
    // load page as normal
    return await resolve(event)
  }

export async function handleFetch({ request, fetch, event }) {

    request.headers.set('Authorization', `${event.cookies.get('Authorization')}`);

    let x = await fetch(request);
    return x;
}

export function handleError({ error, event }) {

  return {
      message: 'Whoops!',
      code: error?.code ?? 'UNKNOWN'
  };
}