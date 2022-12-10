import { Redirect } from "react-router";

export const logoutService = () => {
  const url2 = "http://localhost:9090/user/del";
  const url = "http://localhost:9090/logout";

  fetch(url2, {
    method: "GET",
  });

  fetch(url, {
    method: "GET",
  }).then(function (response) {
    console.log(response);
    <Redirect to="/login"></Redirect>;
  });
};
