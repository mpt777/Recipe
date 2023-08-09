import { signupUser } from "$scripts/auth";
export async function load({ fetch }) {
}

export const actions = {
    default: async({ event }) => {
        return await signupUser({ event })
        //throw redirect(303, "/");
    }
}