export const SET_LOADING = "SET_LOADING";
export const FINISH_LOADING = "FINISH_LOADING";

export const startLoading = (reducer) => ({
  type: SET_LOADING,
  payload: { type: reducer },
});

export const finishLoading = (reducer) => ({
  type: FINISH_LOADING,
  payload: { type: reducer },
});
