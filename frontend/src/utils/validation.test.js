import React from "react";
import { configure } from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { validate } from "./validation";

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

describe("Signup Validations Tests", () => {
  const initialEmptyProps = {
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

  const initialValidProps = {
    username: "",
    password: "Dummy@123",
    name: "Dummy",
    vaccinated: "true",
    emergency_number: "1234567890",
    skills: "c,cpp",
    c_line_one: "",
    c_line_two: "",
    c_city: "",
    c_pincode: "",
    c_state: "",
    p_line_one: "line 1",
    p_line_two: "line 2",
    p_city: "city",
    p_pincode: "123456",
    p_state: "state",
    error: "",
    success: "false",
  };
  it("test empty data fields", () => {
    expect(validate(initialEmptyProps)).toEqual(
      "Name is required \nPermanent Address Line 1 is required \nPermanent Address City is required \nPermanent Address State is required \nEnter Valid 6 digit pincode for permanent address \nEnter valid 10 digit contact number \n"
    );
  });

  it("test valid data fields without current address", () => {
    expect(validate(initialValidProps)).toEqual("");
  });

  it("test valid data with weak password", () => {
    const newData = { ...initialValidProps, password: "dummy12" };

    expect(validate(newData)).toEqual("Weak password  \n");
  });

  it("test valid data with name field not alphabets", () => {
    const newData = { ...initialValidProps, name: "12345" };

    expect(validate(newData)).toEqual("Invalid Name \n");
  });

  it("test valid data with current address line 1", () => {
    const newData = { ...initialValidProps, c_line_one: "line 1" };

    expect(validate(newData)).toEqual(
      "Current Address City is required \nCurrent Address State is required \nEnter Valid 6 digit pincode for current address \n"
    );
  });

  it("test valid data with current address", () => {
    const newData = {
      ...initialValidProps,
      c_line_one: "line 1",
      c_line_two: "line 2",
      c_city: "city",
      c_pincode: "123456",
      c_state: "state",
    };

    expect(validate(newData)).toEqual("");
  });

  it("test valid data with wrong pincode", () => {
    const newData = { ...initialValidProps, p_pincode: "12345" };

    expect(validate(newData)).toEqual(
      "Enter Valid 6 digit pincode for permanent address \n"
    );
  });
  //   const initialValidProps = {
  //     username: "ram",
  //     password: "Ram@1234",
  //     error: "",
  //     data: "",
  //     redirectToHome: false,
  //   };

  //   const initialWeakPassword = {
  //     username: "ram",
  //     password: "Ram1234",
  //     error: "",
  //     data: "",
  //     redirectToHome: false,
  //   };

  //   it("test valid username and password", () => {
  //     expect(validationLogin(initialValidProps)).toEqual("");
  //   });

  //   it("test valid username but weak password", () => {
  //     expect(validationLogin(initialWeakPassword)).toEqual(
  //       "Enter correct password  \n"
  //     );
  //   });
});
