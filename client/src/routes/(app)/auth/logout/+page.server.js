import { Message, addMessage } from "$scripts/message";
import { deleteAuthToken } from "$utils/auth";
import { json, redirect } from '@sveltejs/kit';

// export async function POST({ request, cookies }) {
    
//     return json({"status": 201})
// }

export const actions = {
    default: async (event) => {
        deleteAuthToken(event.cookies);
        event.locals.user = null;
        addMessage(event.cookies, new Message({message: "Logged out Successfully!"}));
        throw redirect(303, "/")
    }
};