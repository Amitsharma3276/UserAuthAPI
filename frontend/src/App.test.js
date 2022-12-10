import React from "react";
import { configure } from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import App from "./App";

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

describe("App Test", () => {
  const wrapper = shallow(<App />);
  it("renders without errors", () => {
    const appComponent = wrapper.find(".App");
    expect(appComponent).toHaveLength(1);
  });
});
