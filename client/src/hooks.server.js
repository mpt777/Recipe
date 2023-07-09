export async function handle({ event, resolve }) {
    // get cookies from browser
    const authToken = event.cookies.get('authorization')

    if (!authToken) {
      // if there is no session load page as normal
      return await resolve(event)
    }
  
    // // find the user based on the session
    const user = await fetch("http://server:3000/auth")
  
    // // if `user` exists set `events.local`
    if (user) {
      event.locals.user = {
        name: user.username,
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