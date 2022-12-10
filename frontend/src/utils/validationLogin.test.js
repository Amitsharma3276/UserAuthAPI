import React from "react";
import { configure } from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { validationLogin } from "./validationLogin";

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

describe("Login Validations Tests", () => {
  const initialEmptyProps = {
    username: "",
    password: "",
    error: "",
    data: "",
    redirectToHome: false,
  };

  const initialValidProps = {
    username: "ram",
    password: "Ram@1234",
    error: "",
    data: "",
    redirectToHome: false,
  };

  const initialWeakPassword = {
    username: "ram",
    password: "Ram1234",
    error: "",
    data: "",
    redirectToHome: false,
  };
  it("test empty username and password", () => {
    expect(validationLogin(initialEmptyProps)).toEqual(
      "Enter Username  \nEnter Password  \n"
    );
  });

  it("test valid username and password", () => {
    expect(validationLogin(initialValidProps)).toEqual("");
  });

  it("test valid username but weak password", () => {
    expect(validationLogin(initialWeakPassword)).toEqual(
      "Enter correct password  \n"
    );
  });
});
