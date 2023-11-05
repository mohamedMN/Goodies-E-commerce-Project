import { axiosPrivate } from "./api";

export const SignUp = (userData) => axiosPrivate.post("/register", userData);
export const LogIn = (userData) =>
  axiosPrivate.post("/authentication", userData);
export const getUsers = () => axiosPrivate.get("/users");
