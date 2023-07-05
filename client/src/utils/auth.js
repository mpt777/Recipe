
export default function setAuthToken(cookies, token){
    cookies.set('authorization', `${token}`, {
        httpOnly: true,
        path: '/',
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 1 day
    });
}