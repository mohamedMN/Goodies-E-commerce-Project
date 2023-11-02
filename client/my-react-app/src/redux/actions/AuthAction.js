import * as AuthApi from "../../services/authService";

export const ADD_USER_LOADING = "ADD_USER_LOADING";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_Fail = "ADD_USER_Fail";
export const SignUp = (formData) => async (dispatch) => {
  dispatch({ type: ADD_USER_LOADING });
  try {
    const { data } = await AuthApi.SignUp(formData);
    dispatch({ type: ADD_USER_SUCCESS, data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ADD_USER_Fail });
  }
};

export const AUTH_LOADING = "AUTH_LOADING";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_Fail = "AUTH_Fail";
export const LogIn = (formData) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  try {
    const data = await AuthApi.LogIn(formData);
    // console.log(("data " + JSON.stringify(data)))
    dispatch({ type: AUTH_SUCCESS, data: data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: AUTH_Fail });
  }
};
export const Users = "Users";
export const ROLE_PERMANENT = "ROLE_PERMANENT";
export const getUsers = () => async (dispatch) => {
  try {
    const data = await AuthApi.getUsers();
    // console.log("data " + JSON.stringify(data));
    dispatch({ type: Users, data: data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ROLE_PERMANENT });
  }
};
