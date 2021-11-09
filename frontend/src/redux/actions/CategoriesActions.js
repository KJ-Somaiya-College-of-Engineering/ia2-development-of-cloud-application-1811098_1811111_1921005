import { get } from "../../utils/requests";
import { getCategorytreeApi } from "../../utils/endpoints";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";

const setCategories = (categories) => ({
  type: FETCH_CATEGORIES,
  payload: categories,
});

export const FetchCategories = () => async (dispatch) => {
  try {
    const [response] = await get(getCategorytreeApi, false);
    dispatch(setCategories(response));
  } catch (err) {}
};
