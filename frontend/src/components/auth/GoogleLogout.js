import { useGoogleLogout as googleLogout } from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../../config";

const useGoogleLogout = (logoutCallBack) =>
  googleLogout({
    clientId: GOOGLE_CLIENT_ID,
    onLogoutSuccess: () => {
      logoutCallBack();
    },
    onFailure: () => console.log("could not logout"),
  });

export default useGoogleLogout;
