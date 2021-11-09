import { post } from "../../utils/requests";
import { authApi, loginApi } from "../../utils/endpoints";
import { startLoading, finishLoading } from "./LoadingActions";
import { emptyCart } from "./CartActions";

export const LOGIN = "LOGIN";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT = "LOGOUT";
export const MAKE_SELLER = "MAKE_SELLER";

const login = (data) => ({
  type: LOGIN,
  payload: data,
});

export const invalidLogin = (error) => ({
  type: LOGIN_FAILED,
  payload: error,
});

export const makeSeller = () => ({ type: MAKE_SELLER });

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(startLoading("auth"));
  try {
    const [user] = await post(authApi.login, false, { email, password });
    dispatch(login(user));
    dispatch(finishLoading("auth"));
  } catch (err) {
    console.error(err);
    dispatch(invalidLogin(err));
  }
};

export const googleLogin = (tokenId) => async (dispatch) => {
  try {
    const [user] = await post(authApi.googleLogin, false, { tokenId });
    dispatch(login(user));
    dispatch(finishLoading("auth"));
  } catch (err) {
    console.error(err);
    dispatch(invalidLogin(err));
  }
};
const deleteToken = () => ({ type: LOGOUT });

export const logout = () => async (dispatch) => {
  dispatch(deleteToken());
  dispatch(emptyCart());
};
