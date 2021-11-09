const initialState = { loading: false, items: [] };

const reducerName = "address";

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return action.payload.type === reducerName
        ? { ...state, loading: true }
        : state;
    case "FINISH_LOADING":
      return action.payload.type === reducerName
        ? { ...state, loading: false }
        : state;
    case "FETCH_ADDRESSES":
      return { ...state, items: [...action.payload] };
    default:
      return state;
  }
};
export default addressReducer;
