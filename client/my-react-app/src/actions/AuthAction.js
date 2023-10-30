import * as AuthApi from "../services/authService";

export const SignUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.SignUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_Fail" });
  }
};

export const LogIn = (formData) => async (dispatch) => {
  dispatch({ type: "ADD_USER" });
  try {
    const { data } = await AuthApi.LogIn(formData);
    dispatch({ type: "ADD_USER_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ADD_USER_Fail" });
  }
};
