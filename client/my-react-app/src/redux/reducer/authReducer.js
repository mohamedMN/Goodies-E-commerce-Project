import {
  AUTH_Fail,
  AUTH_LOADING,
  AUTH_SUCCESS,
  LOGOUT,
} from "../actions/AuthAction";

const authReducer = (
  state = { authData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...state, loading: true, error: false };
    case AUTH_SUCCESS:
      // localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      // console.log("action.data " + localStorage.getItem("profile"));
      return { ...state, authData: action.data, loading: false, error: false };
    case AUTH_Fail:
      return { ...state, loading: false, error: action.error };
    case LOGOUT:
      return { authData: null, loading: false, error: false };
    default:
      return state;
  }
};

export default authReducer;
