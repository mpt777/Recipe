import { loginUser } from "$scripts/auth";
import { papi } from "$utils/api";

export async function load({ fetch }) {
}

export const actions = {
    default: async(event) => {
        let data = await event.request.formData()
        const response = await papi(event.fetch, "common/auth/reset-password", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "password": data.get("password"),
                "token": event.params.token
            })
        });
    }
}