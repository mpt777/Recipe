import { getAuthToken } from "$utils/auth";

export async function load({fetch, cookies, locals}) {
    return {user: locals.user}
}