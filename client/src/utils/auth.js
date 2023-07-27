export function setAuthToken(cookies, token){
    cookies.set('Authorization', `Bearer ${token}`, {
        httpOnly: true,
        path: '/',
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 1 day
    });    
}

export function getAuthToken(cookies){
    return cookies.get('Authorization');    
}


export function deleteAuthToken(cookies){
    cookies.delete('Authorization', { path: '/' });
}