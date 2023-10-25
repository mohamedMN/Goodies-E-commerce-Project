import axios from "axios";
const BaseURL = "http://localhost:3500";

export default axios.create({
  baseURL: BaseURL,
});

export const axiosPrivate = axios.create({
  baseURL: BaseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
