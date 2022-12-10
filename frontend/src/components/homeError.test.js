import React from "react";
import { configure } from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { logoutService } from "../services/logoutService";
import HomeError from "./homeError";
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

describe("Home Data Test", () => {
  const initialProps = {
    homeData: {
      token: "blank",
      data: [],
      userName: "dummy",
      error: false,
    },
    handleSignout: { logoutService },
  };

  const wrapper = shallow(<HomeError {...initialProps} />);

  it("render login  component", () => {
    act(() => {
      render(wrapper, container);
    });
    const button = document.querySelector("button");
    expect(button.innerHTML).toBe("Login");
  });

  it("render proper props for homeInfo:", () => {
    act(() => {
      render(wrapper, container);
    });

    const h1 = document.querySelector("h1");
    expect(h1.innerHTML).toBe("Hi There dummy");
    //expect(wrapper.find("h1")).toBe("Hi There dummy ");
    //expect(wrapper.textContent).toBe("");
  });
});

// it("renders with a center", () => {
//     act(() => {
//       render(<VaccinationCenter center="Kosi Kalan CHC" />, container);
//     });
//     console.log("Hello#" + container. + "#");
//     expect(container.textContent).toBe("Kosi Kalan CHC");
//   });
