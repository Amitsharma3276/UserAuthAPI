import React, { useState } from "react";
import FormHeader from "../common/FormHeader";
import Input from "../common/Input";
import { loginService } from "../services/loginService";
import { Error } from "../common/Error";
import { validationLogin } from "../utils/validationLogin";
import { redirectUser } from "../common/redirectUser";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    error: "",
    data: "",
    redirectToHome: false,
  });

  const { username, password, error, redirectToHome } = userInfo;

  const handleChange = (user) => (e) => {
    setUserInfo({ ...userInfo, error: false, [user]: e.target.value });
  };

  const clickLogin = (e) => {
    e.preventDefault();
    let errorMsg = validationLogin(userInfo);
    if (errorMsg) {
      setUserInfo({ ...userInfo, error: errorMsg, redirectToHome: false });
      return;
    }
    setUserInfo({ ...userInfo, error: false });
    let status;
    loginService(userInfo)
      .then((response) => {
        console.log(response.status);
        status = response.status;
      })
      .then((data) => {
        if (status === 200) {
          console.log("logged in " + status);
          setUserInfo({ ...userInfo, redirectToHome: true, data: data });
        } else {
          setUserInfo({
            ...userInfo,
            error: "Invalid Credentials",
            redirectToHome: false,
          });
        }
      });
  };

  const formHeader = {
    title: <h3>Welcome to Team AAAA's webapp</h3>,
    message: <p>Please Signup with your credentials</p>,
  };
  return (
    <div className="auth-inner">
      <form>
        <FormHeader title={formHeader.title} message={formHeader.message} />

        <br />

        {Error(userInfo)}
        {redirectUser(userInfo, setUserInfo)}

        <Input
          label="Username"
          onChange={handleChange("username")}
          type="text"
          className="form-control"
          placeholder="Enter username"
          value={username}
          isRequired="true"
        />
        <Input
          label="Password"
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          isRequired="true"
        />

        <button
          onClick={clickLogin}
          type="submit"
          className="btn btn-primary btn-block"
        >
          Login
        </button>
        <p className="forgot-password text-right">
          New User? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
