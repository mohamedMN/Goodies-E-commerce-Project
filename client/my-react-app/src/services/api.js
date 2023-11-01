import axios from "axios";
const BaseURL = "http://localhost:3125";

export default axios.create({
  baseURL: BaseURL,
});

export const axiosPrivate = axios.create({
  baseURL: BaseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});