const type = "auth";
const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "SET_LOADING":
      return action.payload.type === type ? { isLoading: true } : state;
    case "FINISH_LOADING":
      return action.payload.type === type
        ? { ...state, isLoading: false }
        : state;
    case "LOGIN_FAILED":
      return { error: action.payload, auth: false };
    case "LOGOUT":
      return { auth: false };

    default:
      return state;
  }
};

export default authReducer;
