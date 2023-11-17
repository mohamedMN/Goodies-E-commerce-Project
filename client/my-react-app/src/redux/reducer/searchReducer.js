import { SEARCHING, SEARCHING_Fail } from "../actions/userAction";

const searchReducer = (state = { search: null, error: "" }, action) => {
  switch (action.type) {
    case SEARCHING:
      return { ...state, search: action.search, error: "" };

    case SEARCHING_Fail:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export default searchReducer;
