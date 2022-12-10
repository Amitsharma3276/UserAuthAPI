import React from "react";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { logoutService } from "./logoutService";

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

describe("logout Services test", () => {
  let wrapper;
  it("test logout Services", async () => {
    const fakeUrl = "";

    const mockLogout = jest.spyOn(global, "fetch");
    mockLogout.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(),
      })
    );

    //Use the async version of act to apply resolved promises
    await act(async () => {
      render(logoutService, container);
    });

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });

  // it("check if fetch returning the response", async () => {
  //   // Setup
  //   const req = jest.fn(),
  //     res = { redirect: jest.fn() },
  //     next = jest.fn();
  //   global.fetch = jest.fn().mockImplementation(() => {
  //     return new Promise((resolve) =>
  //       resolve({
  //         json: () => {
  //           return { data: "hello" };
  //         },
  //       })
  //     );
  //   });
  //   //await middlewares.dataHandler(req, res, next);
  //   //  Assert
  //   expect((await global.fetch()).json()).toEqual({ data: "hello" }); // Success!
  //   expect(res.redirect).toHaveBeenCalledTimes(0);
  // });

  // it("makes a fetch call", async () => {
  //   wrapper = logoutService();

  //   await act(async () => {
  //     render(<logoutService />, container);
  //   });

  //   expect(wrapper.getByText("fetch")).toHaveBeenCalledTimes(1);
  // });
});
