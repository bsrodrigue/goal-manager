import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:1337/api",
})

httpClient.interceptors.request.use((config) => {
  //const token = localStorage.getItem('token');
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAzMDIyNjQyLCJleHAiOjE3MDU2MTQ2NDJ9.3Me1a0SU_pr2eZlXJ8SaIQgD0Pbkghkzy04tpS3Bexk";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  //TODO: Provide a generic or default herror handling

  return Promise.reject(error);
})

export default httpClient;
