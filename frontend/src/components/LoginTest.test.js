import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import * as loginUtil from "../utils/validationLogin";

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

// jest.mock("../utils/validationLogin", () => {
//   return "";
// });

describe("<Login /> with no props", () => {
  const wrapper = shallow(<Login />);

  //SNAPSHOT
  it("should match the snapshot", () => {
    act(() => {
      render(wrapper, container);
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  //USERNAME
  it("should have an username input field", () => {
    act(() => {
      render(wrapper, container);
    });
    expect(wrapper.find('Input[type="text"]')).toHaveLength(1);
  });

  it("should have proper props for username field", () => {
    act(() => {
      render(wrapper, container);
    });
    expect(wrapper.find('Input[type="text"]').props()).toEqual({
      label: "Username",
      onChange: expect.any(Function),
      type: "text",
      className: "form-control",
      placeholder: "Enter username",
      value: expect.any(String),
      isRequired: "true",
    });
  });

  it("Username onChangeHandler test", () => {
    act(() => {
      render(wrapper, container);
    });
    // console.log('Check#'+wrapper.find('Input[type="password"]').props('onChange'));
    wrapper.find('Input[type="text"]').simulate("change", {
      target: { value: "Dummy" },
    });

    expect(wrapper.find('Input[type="text"]').prop("value")).toEqual("Dummy");
  });

  //PASSWORD
  it("should have a password input field", () => {
    act(() => {
      render(wrapper, container);
    });
    expect(wrapper.find('Input[type="password"]')).toHaveLength(1);
  });

  it("should have proper props for password field", () => {
    act(() => {
      render(wrapper, container);
    });
    expect(wrapper.find('Input[type="password"]').props()).toEqual({
      label: "Password",
      onChange: expect.any(Function),
      type: "password",
      className: "form-control",
      placeholder: "Enter password",
      value: expect.any(String),
      isRequired: "true",
    });
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

  //LOGIN BUTTON
  it("render login component", () => {
    act(() => {
      render(wrapper, container);
    });
    const button = document.querySelector("button");
    expect(button.innerHTML).toBe("Login");
  });

  it("ClickLogin Button test with no errors", () => {
    act(() => {
      render(wrapper, container);
    });
    const clickEvent = { preventDefault: jest.fn() };
    //const spy = jest.spyOn(wrapper.instance(), "validationLogin");
    wrapper.find("button").simulate("click", clickEvent);
    expect(clickEvent.preventDefault).toBeCalledTimes(1);
  });

  it("Login Validation", () => {
    const fakeData = {
      username: "dummy",
      password: "Dummy@123",
      error: "",
      data: "",
      redirectToHome: false,
    };

    const errorResult = loginUtil.validationLogin(fakeData);
    console.log(errorResult);
    expect(errorResult).toBe("");

    const errorMessage = "Invalid Credentials";
    const mockValidationLogin = jest.spyOn(loginUtil, "validationLogin");
    mockValidationLogin.mockResolvedValue(errorMessage);
    return loginUtil.validationLogin(fakeData).then((response) => {
      //console.log(response);
      expect(response).toBe(errorMessage);
      expect(mockValidationLogin).toHaveBeenCalledTimes(1);
      mockValidationLogin.mockRestore();
    });
  });

  it("Login Validation with errors", () => {
    const fakeNewData = {
      username: "dummy",
      password: "",
      error: "",
      data: "",
      redirectToHome: false,
    };

    const validationMock = jest.spyOn(loginUtil, "validationLogin");
    const result = validationMock(fakeNewData);
    expect(validationMock).toHaveBeenCalledTimes(1);
    expect(result).toBe("Enter Password  \n");

    const erroMessage = "Enter Password";
    const mockValidationLogin = jest.spyOn(loginUtil, "validationLogin");
    mockValidationLogin.mockResolvedValue(erroMessage);
    return loginUtil.validationLogin(fakeNewData).then((response) => {
      expect(response).toBe(erroMessage);
      expect(mockValidationLogin).toHaveBeenCalledTimes(2);
      mockValidationLogin.mockRestore();
    });
  });

  // it("LoginService test without errors", () => {
  //   const fakeNewData = {
  //     username: "dummy",
  //     password: "Dummy@123",
  //     error: "",
  //     data: "",
  //     redirectToHome: false,
  //   };

  //   const LoginServiceMock = jest.spyOn(global, "fetch");
  //   const result = validationMock(fakeNewData);
  //   expect(validationMock).toHaveBeenCalledTimes(1);
  //   expect(result).toBe("Enter Password  \n");

  //   const erroMessage = "Enter Password";
  //   const mockValidationLogin = jest.spyOn(loginUtil, "validationLogin");
  //   mockValidationLogin.mockResolvedValue(erroMessage);
  //   return loginUtil.validationLogin(fakeNewData).then((response) => {
  //     expect(response).toBe(erroMessage);
  //     expect(mockValidationLogin).toHaveBeenCalledTimes(2);
  //     mockValidationLogin.mockRestore();
  //   });
  // });
});
