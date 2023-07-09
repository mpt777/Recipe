import { deleteAuthToken } from "$utils/auth";

export async function load({ request, cookies }) 
{
    deleteAuthToken(cookies)
}