import React from "react";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { homeService } from "./homeService";

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

describe("Home Services test", () => {
  const wrapper = homeService();
  it("makes a fetch call", async () => {
    // const fakeCenter = {
    //   center: "ABC",
    //   cost: "Free",
    // };
    // const mockHomeService = jest.spyOn(global, "fetch");
    // mockHomeService.mockImplementationOnce(() =>
    //   Promise.resolve({
    //     json: () => Promise.resolve(fakeCenter),
    //   })
    // );

    await act(async () => {
      render(<homeService />, container);
    });

    //expect(mockHomeService).toHaveBeenCalledTimes(0);
    // expect(mockHomeService).toHaveReturned(fakeCenter);
    expect((await (await wrapper).text()).toString()).toBe("Unauthorized");
    //mockHomeService.mockRestore();
  });
});

// it("test Home Services", async () => {
//   const mockHome = jest.spyOn(global, "fetch");
//   mockHome.mockImplementation(() =>
//     Promise.resolve({
//       json: () => Promise.resolve(),
//     })
//   );

//   expect(fetch).toHaveBeenCalledTimes(0);

//   // remove the mock to ensure tests are completely isolated
//   global.fetch.mockRestore();
// });

// it("test fetch", () => {
//   global.fetch = jest.fn(() => Promise.resolve());

// });
