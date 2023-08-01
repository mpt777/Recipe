import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3000/api', // Set your default API base URL here
//   headers: {
//     'Content-Type': 'application/json',
//     //"autorization": cookie.get("autorization") || "",
//   },  
//   useCredentials: true
// });

export default async function api(endpoint, data){
  return fetch(`http://localhost:8080${endpoint}`, data)
}
