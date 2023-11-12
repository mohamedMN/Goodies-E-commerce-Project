import { axiosPrivateUser } from "./api";

export const SignUp = (userData) =>
  axiosPrivateUser.post("/register", userData);
export const LogIn = (userData) =>
  axiosPrivateUser.post("/authentication", userData);
export const getUsers = () => axiosPrivateUser.get("/users");
