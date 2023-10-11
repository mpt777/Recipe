import { papi } from '$utils/api';
import { redirect } from '@sveltejs/kit'

export async function handle({ event, resolve }) {
    // get cookies from browser
      const authToken = event.cookies.get('Authorization')

      
      if (authToken) {
        // get user from endpoint
        
        try{
          const response = await papi(event.fetch, "common/auth/user/current");
          const user = await response.json()
          if (user) {
            event.locals.user = user
          }
        } catch {
          console.log("here")
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
  
    return await resolve(event)
  }

export async function handleFetch({ request, fetch, event }) {

    request.headers.set('Authorization', `${event.cookies.get('Authorization')}`);
    let x = await fetch(request);
    return x;
}

export function handleError({ error, event }) {

  console.log("ERROR", error)
  return {
      message: 'Whoops!',
      code: error?.code ?? 'UNKNOWN',
      error: error
  };
}