import { ROLE_PERMANENT, Users, cleanGetUsers } from "../actions/AuthAction";

const getAllUsers = (state = { Data: null, error: false }, action) => {
  switch (action.type) {
    case Users:
      return { ...state, Data: action.data, error: false };
    case cleanGetUsers:
      return { Data: null, error: false };
    case ROLE_PERMANENT:
      return { ...state, error: true };
    default:
      return state;
  }
};

export default getAllUsers;
