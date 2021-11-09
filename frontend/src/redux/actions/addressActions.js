import { get } from "../../utils/requests";
import { UserAddressesApi } from "../../utils/endpoints";
import { startLoading, finishLoading } from "./LoadingActions";
export const FETCH_ADDRESSES = "FETCH_ADDRESSES";

const addAddresses = (addresses) => ({
  type: FETCH_ADDRESSES,
  payload: addresses,
});

export const fetchAddresses = () => async (dispatch) => {
  try {
    dispatch(startLoading("address"));
    const [addresses] = await get(UserAddressesApi);
    dispatch(addAddresses(addresses));
    dispatch(finishLoading("address"));
  } catch (err) {
    console.error(err);
  }
};
