const getAllUsers = (
    state = { Data: null, error: false },
    action
) => {
    switch (action.type) {
        case "Users":
            return { ...state, Data: action.data, error: false };
        case "Impossible because of YOUR ROLE!":
            return { ...state, error: true };
        default:
            return state
    }
};

export default getAllUsers;