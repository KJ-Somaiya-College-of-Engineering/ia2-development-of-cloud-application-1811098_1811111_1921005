const initialState = [];
const CategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES":
      state = [...action.payload.categories];
      return state;
    default:
      return state;
  }
};

export default CategoriesReducer;
