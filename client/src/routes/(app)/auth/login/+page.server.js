import { loginUser } from "$scripts/auth";

export async function load({ fetch }) {
}

export const actions = {
    default: async(event) => {
        return await loginUser(event)
        //throw redirect(303, "/");
    }
}