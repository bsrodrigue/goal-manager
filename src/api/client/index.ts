import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:1337/api",
})

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  //TODO: Provide a generic or default herror handling

  return Promise.reject(error);
})

export default httpClient;
