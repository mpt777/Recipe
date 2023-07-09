// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:8080/api', // Set your default API base URL here
//   headers: {
//     'Content-Type': 'application/json',
//     //"autorization": cookie.get("autorization") || "",
//   },  
//   useCredentials: true
// });


export default async function iapi(endpoint, data){
    return fetch(`http://localhost:8080/api/${endpoint}`, data)
}