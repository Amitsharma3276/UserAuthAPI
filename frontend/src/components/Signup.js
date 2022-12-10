import React, { useState } from "react";
import { validate } from "../utils/validation";
import FormHeader from "../common/FormHeader";
import Address from "../common/Address";
import Input from "../common/Input";
import { signupService } from "../services/signupService";
import { Error } from "../common/Error";

const initialSignupState = {
  username: "",
  password: "",
  name: "",
  vaccinated: "true",
  emergency_number: "",
  skills: "",
  c_line_one: "",
  c_line_two: "",
  c_city: "",
  c_pincode: "",
  c_state: "",
  p_line_one: "",
  p_line_two: "",
  p_city: "",
  p_pincode: "",
  p_state: "",
  error: "",
  success: "false",
};

const Signup = () => {
  const [userInfo, setUserInfo] = useState(initialSignupState);

  const handleChange = (userAttribute) => (e) => {
    setUserInfo({ ...userInfo, error: false, [userAttribute]: e.target.value });
  };

  const signupClick = (e) => {
    e.preventDefault();
    let errorMessage = validate(userInfo);
    if (errorMessage) {
      setUserInfo({ ...userInfo, error: errorMessage, success: false });
      return;
    }

    setUserInfo({ ...userInfo, error: false });

    let status;
    signupService(userInfo)
      .then((response) => {
        //console.log(response.status);
        status = response.status;
        return response.text();
      })
      .then((data) => {
        console.log(data);

        if (status === 201) {
          setUserInfo({
            ...userInfo,
            success: true,
            username: "",
            password: "",
            name: "",
            vaccinated: "",
            emergency_number: "",
            skills: "",
            c_line_one: "",
            c_line_two: "",
            c_city: "",
            c_pincode: "",
            c_state: "",
            p_line_one: "",
            p_line_two: "",
            p_city: "",
            p_pincode: "",
            p_state: "",
            error: data,
          });
        } else {
          setUserInfo({ ...userInfo, error: data, success: false });
        }
      });
  };

  const formHeader = {
    title: <h3>Welcome to Team AAAA's webapp</h3>,
    message: <p>Please Signup with your credentials</p>,
  };

  return (
    <div className="auth-inner container-fluid">
      <form onSubmit={signupClick} id="myForm">
        <FormHeader title={formHeader.title} message={formHeader.message} />
        <br />
        {Error(userInfo)}

        <Input
          label="Name"
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          placeholder="Name"
          userInfo={userInfo.name}
          isRequired="true"
        />
        <div className="row">
          <div className="col">
            <Input
              label="Username"
              onChange={handleChange("username")}
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={userInfo.username}
              isRequired="false"
            />
          </div>
          <div className="col">
            <Input
              label="Password"
              onChange={handleChange("password")}
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={userInfo.password}
              isRequired="false"
            />
          </div>
        </div>

        <Input
          label="Contact Number"
          onChange={handleChange("emergency_number")}
          type="text"
          className="form-control"
          placeholder="Enter your contact Number"
          value={userInfo.emergency_number}
          isRequired="true"
        />

        <hr />

        <div className="row">
          <div className="col">
            <div className="form-group">
              <p>
                <strong>Permanent Address</strong>*
              </p>
            </div>
            <Address
              kind={"p"}
              line_one={userInfo.p_line_one}
              line_two={userInfo.p_line_two}
              city={userInfo.p_city}
              pincode={userInfo.p_pincode}
              state={userInfo.p_city}
              handleChange={handleChange}
              isRequired="true"
            />
          </div>

          <div className="col">
            <div className="form-group">
              <p>
                <strong>Current Address</strong>
              </p>
            </div>
            <Address
              kind={"c"}
              line_one={userInfo.c_line_one}
              line_two={userInfo.c_line_two}
              city={userInfo.c_city}
              pincode={userInfo.c_pincode}
              state={userInfo.c_city}
              handleChange={handleChange}
              isRequired="false"
            />
          </div>
        </div>

        <hr />

        <div className="form-group">
          <label>Vaccination Status</label>
          <select
            onChange={handleChange("vaccinated")}
            type="number"
            className="form-control"
            value={userInfo.vaccinated}
          >
            <option value="true">YES</option>
            <option value="false">NO</option>
          </select>
        </div>

        <div className="form-group">
          <Input
            label="Skills"
            onChange={handleChange("skills")}
            type="text"
            className="form-control"
            placeholder="Add atleast 2 skills"
            value={userInfo.skills}
            isRequired="true"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered? <a href="/login">Log in</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
