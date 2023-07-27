import { getAuthToken } from "$utils/auth";

export async function load({fetch, cookies}) {
    const response = await fetch("http://server:3000/api/auth/user/current");
    try{
        return {user: await response.json()}
    }
    catch {
        return {}
    }
}