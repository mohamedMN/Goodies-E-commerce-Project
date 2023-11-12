import axios from "axios";
// const BaseURL = "http://localhost:3125";
const Base_URL_User = "http://localhost:3125/users";

export default axios.create({
  baseURL: Base_URL_User,
});

export const axiosPrivateUser = axios.create({
  baseURL: Base_URL_User,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
