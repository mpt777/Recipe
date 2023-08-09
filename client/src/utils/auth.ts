import type { Cookies } from "@sveltejs/kit";

export function setAuthToken(cookies : Cookies, token: string){
    cookies.set('Authorization', `Bearer ${token}`, {
        httpOnly: true,
        path: '/',
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 1 day
    });    
}

export function getAuthToken(cookies : Cookies){
    return cookies.get('Authorization');    
}


export function deleteAuthToken(cookies : Cookies){
    cookies.delete('Authorization', { path: '/' });
}