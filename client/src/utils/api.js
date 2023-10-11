// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:8080/api', // Set your default API base URL here
//   headers: {
//     'Content-Type': 'application/json',
//     //"autorization": cookie.get("autorization") || "",
//   },  
//   useCredentials: true
// });


export async function iapi(endpoint, data){
    return fetch(`http://localhost:8080/api/v1/${endpoint}`, data)
}

export async function papi(fetch, endpoint, data) {
    return fetch(`http://server:3000/api/v1/${endpoint}`, data)
}