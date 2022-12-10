import React from "react";
import { configure } from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import VaccinationCenter from "./VaccinationCenter";

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

describe("Vaccination Center Test", () => {
  const initialProps = { center: "ABC" };

  const wrapper = shallow(<VaccinationCenter {...initialProps} />);

  it("test center", () => {
    expect(wrapper.find("h3").contains("ABC")).toBe(true);
  });
});

// it("renders with a center", () => {
//     act(() => {
//       render(<VaccinationCenter center="Kosi Kalan CHC" />, container);
//     });
//     console.log("Hello#" + container. + "#");
//     expect(container.textContent).toBe("Kosi Kalan CHC");
//   });
