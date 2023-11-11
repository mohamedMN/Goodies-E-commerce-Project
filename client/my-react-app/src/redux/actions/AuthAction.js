import * as AuthApi from "../../services/authService";

export const ADD_USER_LOADING = "ADD_USER_LOADING";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_Fail = "ADD_USER_Fail";

// sign up action
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

// login ACTION
export const AUTH_LOADING = "AUTH_LOADING";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_Fail = "AUTH_Fail";
export const LOGOUT = "LOGOUT";
export const logout = () => ({
  type: LOGOUT,
});

export const loading = () => ({
  type: AUTH_LOADING,
});
export const LogIn = (formData) => async (dispatch) => {
  dispatch(logout());
  dispatch(loading());

  try {
    const data = await AuthApi.LogIn(formData);
    // console.log(("data " + JSON.stringify(data)))
    dispatch({ type: AUTH_SUCCESS, data: data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: AUTH_Fail, error: error });
  }
};

// get ALL users action
export const Users = "Users";
export const ROLE_PERMANENT = "ROLE_PERMANENT";
export const CLEAN_GET_USERS = "CLEAN_GET_USERS";
export const cleanGetUsers = () => ({
  type: CLEAN_GET_USERS,
});
export const getUsers = () => async (dispatch) => {
  try {
    const data = await AuthApi.getUsers();
    dispatch({ type: Users, data: data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ROLE_PERMANENT });
  }
};

export const UPDATE_USER = "UPDATE_USER";
export const ERREUR_UPDATE_USER = "ERREUR_UPDATE_USER";
export const CLEAN_UPDATE_USER = "CLEAN_UPDATE_USER";
export const cleanUpdateId = () => ({
  type: CLEAN_UPDATE_USER,
});
export const UpdateUser = (id) => (dispatch) => {
  try {
    // console.log("id " + id);
    dispatch({ type: UPDATE_USER, id: id });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERREUR_UPDATE_USER, error: error });
  }
};
