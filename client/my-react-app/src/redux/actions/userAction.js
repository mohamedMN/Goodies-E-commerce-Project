export const SEARCHING = "SEARCHING";
export const SEARCHING_Fail = "SEARCHING_Fail";

export const searchUserName = (search) => async (dispatch) => {
  dispatch({ type: SEARCHING });
  try {
    dispatch({ type: SEARCHING, search: search });
  } catch (error) {
    console.log(error);
    dispatch({ type: SEARCHING_Fail });
  }
};
