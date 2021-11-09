import React, { useCallback } from "react";
import { GoogleLogin } from "react-google-login";
import { connect, useDispatch } from "react-redux";
import { GOOGLE_CLIENT_ID } from "../../config";
import { googleLogin, invalidLogin } from "../../redux/actions/authActions";
const GoogleSignIn = (props) => {
  const dispatch = useDispatch();
  const onSuccess = useCallback(
    (res) => {
      dispatch(googleLogin(res.tokenId));
    },
    [dispatch]
  );
  const onFailure = useCallback(
    (res) => {
      console.log(res);
      //
      dispatch(invalidLogin(res.error));
    },
    [dispatch]
  );
  return (
    <GoogleLogin
      className={`w-100 text-dark ${props.className}`}
      clientId={GOOGLE_CLIENT_ID}
      buttonText="LOGIN WITH GOOGLE"
      isSignedIn={!props.isLoggedIn}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
};

const mapStateToProps = ({ user }) => ({ isLoggedIn: user.auth });

export default connect(mapStateToProps)(GoogleSignIn);
