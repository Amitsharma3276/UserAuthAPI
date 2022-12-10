import React from "react";
import { shallow } from "enzyme";
import Signup from "./Signup";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import * as signupUtil from "../utils/validation";

configure({ adapter: new Adapter() });
let container = null;
beforeEach(() => {
  //render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("<Signup /> with no props", () => {
  const wrapper = shallow(<Signup />);

  //SNAPSHOT
  it("should match the snapshot", () => {
    act(() => {
      render(wrapper, container);
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Password onChangeHandler test", () => {
    act(() => {
      render(wrapper, container);
    });
    // console.log('Check#'+wrapper.find('Input[type="password"]').props('onChange'));
    wrapper.find('Input[type="password"]').simulate("change", {
      target: { value: "Dummy@123" },
    });

    expect(wrapper.find('Input[type="password"]').prop("value")).toEqual(
      "Dummy@123"
    );
  });

  //SIGNUP BUTTON
  it("render signup component", () => {
    act(() => {
      render(wrapper, container);
    });
    const button = document.querySelector("button");
    expect(button.innerHTML).toBe("Sign Up");
  });

  it("signupClick Button test with no errors", () => {
    act(() => {
      render(wrapper, container);
    });
    const clickEvent = { preventDefault: jest.fn() };
    //const spy = jest.spyOn(wrapper.instance(), "validationLogin");
    wrapper.find("button").simulate("click", clickEvent);
    expect(clickEvent.preventDefault).toBeCalledTimes(0);
  });

  it("signupClick form submit test with no errors", () => {
    act(() => {
      render(wrapper, container);
    });
    const clickEvent = { preventDefault: jest.fn() };
    //const spy = jest.spyOn(wrapper.instance(), "validationLogin");
    wrapper.find("form").simulate("submit", clickEvent);
    expect(clickEvent.preventDefault).toBeCalledTimes(1);
  });

  it("Signup Validation", () => {
    const fakeData = {
      username: "dummy",
      password: "dummy@123",
      name: "dummy",
      vaccinated: "true",
      emergency_number: "1234567890",
      skills: "c,cpp",
      c_line_one: "",
      c_line_two: "",
      c_city: "",
      c_pincode: "",
      c_state: "",
      p_line_one: "line1",
      p_line_two: "line2",
      p_city: "city",
      p_pincode: "123456",
      p_state: "state",
      error: "",
      success: "false",
    };

    const errorResult = signupUtil.validate(fakeData);
    //console.log(errorResult);
    expect(errorResult).toBe("");

    const errorMessage = "Invalid Credentials";
    const mockValidationSignUp = jest.spyOn(signupUtil, "validate");
    mockValidationSignUp.mockResolvedValue(errorMessage);
    return signupUtil.validate(fakeData).then((response) => {
      //console.log(response);
      expect(response).toBe(errorMessage);
      expect(mockValidationSignUp).toHaveBeenCalledTimes(1);
    });
  });

  // it("Login Validation with errors", () => {
  //   const fakeData = {
  //     username: "dummy",
  //     password: "",
  //     error: "",
  //     data: "",
  //     redirectToHome: false,
  //   };

  //   const errorResult1 = loginUtil.validationLogin(fakeData);
  //   console.log(errorResult1);
  //   //expect(errorResult1).toBe("Enter password \n");

  //   const erroMessage = "Enter password";
  //   const mockValidationLogin = jest.spyOn(loginUtil, "validationLogin");
  //   mockValidationLogin.mockResolvedValue(erroMessage);
  //   return loginUtil.validationLogin(fakeData).then((response) => {
  //     expect(response).toBe(erroMessage);
  //     expect(mockValidationLogin).toHaveBeenCalledTimes(2);
  //   });
  // });
});
