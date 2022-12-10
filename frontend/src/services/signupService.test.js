import React from "react";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { signupService } from "./signupService";

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

describe("signup Services test", () => {
  let wrapper;
  it("test signup Services", async () => {
    const fakeUrl = "";

    const mockSignup = jest.spyOn(global, "fetch");
    mockSignup.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(),
      })
    );

    //Use the async version of act to apply resolved promises
    await act(async () => {
      render(signupService, container);
    });

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });

  it("makes a fetch call", async () => {
    const fakeUser = {
      username: "dummy",
      password: "Dummy@123",
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

    wrapper = signupService(fakeUser);

    await act(async () => {
      render(<signupService {...fakeUser} />, container);
    });

    expect((await (await wrapper).text()).toString()).not.toHaveLength(0);
  });
});
