import { Redirect } from "react-router";

export const redirectUser = (userInfo,setUserInfo) => {
    if (!(userInfo.data === ""))
      if (userInfo.redirectToHome) {
        return <Redirect to="/home" data={userInfo.data} />;
      } else {
        setUserInfo({ ...userInfo, error: "Invalid Credentials" });
      }
  };