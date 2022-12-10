const LoginUser = (values) => {
  // console.log(values);
  var base64 = require("base-64");
  // console.log(base64.encode("frontend:Frontend@1"));
  try {
    var url = "http://localhost:9090/user/dashboard";
    var username = values.username;
    var password = values.password;

    console.log("in LoginUser.js");

    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Basic " + base64.encode(username + ":" + password),
        "content-type": "application/json",
      },
    });

    //response.status gives the response code
    //response.statusText gives the message for response status
  } catch (err) {
    throw err;
  }
};

export const loginService = async (userInfo) => {
  const response = await LoginUser(userInfo);

  return await response;
};
