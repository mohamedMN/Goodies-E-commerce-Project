import {
  ADD_USER,
  ADD_USER_Fail,
  ADD_USER_SUCCESS,
} from "../actions/AuthAction";

const addUserReducer = (
  state = { authData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, loading: true, error: false };
    case ADD_USER_SUCCESS:
      return { ...state, authData: action.data, loading: false, error: false };
    case ADD_USER_Fail:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default addUserReducer;
