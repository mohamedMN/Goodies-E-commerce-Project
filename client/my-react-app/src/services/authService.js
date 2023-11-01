import axios from "./api";
import axiosPrivate from "./api";

export const SignUp = (userData) => axiosPrivate.post("/register", userData);
export const LogIn = (userData) => axiosPrivate.post("/authentication", userData);
export const getUsers = () => axios.get("/users");
