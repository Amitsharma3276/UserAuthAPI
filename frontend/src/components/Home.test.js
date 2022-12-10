import React from "react";
import { shallow } from "enzyme";
import Home from "./Home";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";

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

describe("<Home /> test suite", () => {
  const wrapper = shallow(<Home />);

  //SNAPSHOT
  it("should match the snapshot", () => {
    act(() => {
      render(wrapper, container);
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
