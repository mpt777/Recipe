import { loginUser } from "$scripts/auth.js";
export async function load({ fetch }) {
    console.log("here")
}

export const actions = {
    default: async(event) => {
        return await loginUser(event)
        //throw redirect(303, "/");
    }
}