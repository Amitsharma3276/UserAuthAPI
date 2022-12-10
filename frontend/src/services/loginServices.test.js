import React from "react";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { logoutService } from "./logoutService";
import { loginService } from "./loginService";

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

describe("login Services test", () => {
  let wrapper;
  it("test login Services", async () => {
    const mockLogin = jest.spyOn(global, "fetch");
    mockLogin.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(),
      })
    );

    //Use the async version of act to apply resolved promises
    await act(async () => {
      render(loginService, container);
    });

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });

  it("makes a fetch call", async () => {
    const fakeUser = {
      username: "dummy",
      password: "Dummy@123",
      error: "",
      data: "",
      redirectToHome: false,
    };

    wrapper = loginService(fakeUser);

    await act(async () => {
      render(<loginService {...fakeUser} />, container);
    });

    expect((await (await wrapper).text()).toString()).toHaveLength(0);
  });
});
