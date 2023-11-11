import {
  CLEAN_UPDATE_USER,
  ERREUR_UPDATE_USER,
  UPDATE_USER,
} from "../actions/AuthAction";

const UpdateUserReducer = (state = { id: null, error: "" }, action) => {
  switch (action.type) {
    case UPDATE_USER:
      // console.log("user " + action.id);
      return { ...state, id: action.id, error: "" };
    case CLEAN_UPDATE_USER:
      // console.log("user " + action.id);
      return { id: null, error: "" };
    case ERREUR_UPDATE_USER:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default UpdateUserReducer;
