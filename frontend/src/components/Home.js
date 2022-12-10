import React from "react";
import { useEffect, useState } from "react";
import { homeService } from "../services/homeService";
import HomeData from "./homeData";
import HomeError from "./homeError";
import HomeNoData from "./homeNoData";
import { logoutService } from "../services/logoutService";

const initialState = {
  token: "blank",
  data: [],
  userName: "blank",
  error: false,
};

const Home = () => {
  const [homeInfo, setHomeInfo] = useState(initialState);

  useEffect(() => {
    // const fetchData = async (homeInfo) => {
    //   const response = await homeService(homeInfo);
    //   return response;
    // };
    // const res = fetchData(homeInfo);
    // console.log(res);
    // const responseData = res.text;

    homeService()
      .then(function (response) {
        return response.text();
      })
      .then(function (responseData) {
        if (responseData === "You must login to see this page") {
          setHomeInfo({
            token: "null",
            data: ["sorry", "You must login to see this page"],
            userName: "Stranger",
            error: true,
          });
        } else if (responseData === "Unauthorized") {
          setHomeInfo({
            token: "blank",
            data: ["Hey", "You've Entered Somewhere you shouldn't be"],
            userName: "blank",
            error: true,
          });
        } else {
          const data = responseData.replace("}", "");
          const arr = data.split("#");
          const token = arr[1];
          let tmp = arr[0];
          let userName = arr[2];
          userName = userName.split(":")[1];
          tmp = tmp.replace("{", " ");
          let center = tmp.replace("=", " # Cost : ");
          let centerArr = center.split(",");
          for (let i = 0; i < centerArr.length; i++) {
            centerArr[i] = centerArr[i].replace("=", "# Cost : ");
          }
          console.log(center);
          setHomeInfo({
            token: token,
            data: centerArr,
            userName: userName,
            error: false,
          });
        }
      });
  }, []);

  return (
    <div>
      {homeInfo.error && (
        <HomeError homeData={homeInfo} handleSignOut={logoutService} />
      )}
      {!homeInfo.error && !homeInfo.data && (
        <HomeNoData homeData={homeInfo} handleSignOut={logoutService} />
      )}
      {!homeInfo.error && homeInfo.data && (
        <HomeData homeData={homeInfo} handleSignOut={logoutService} />
      )}
    </div>
  );
};

export default Home;
