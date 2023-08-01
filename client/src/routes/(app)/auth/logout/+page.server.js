import { deleteAuthToken } from "$utils/auth";
import { json, redirect } from '@sveltejs/kit';

// export async function POST({ request, cookies }) {
    
//     return json({"status": 201})
// }

export const actions = {
    default: async (event) => {
        console.log("HERE")
        deleteAuthToken(event.cookies);
        event.locals.user = null;
        throw redirect(303, "/")
    }
};