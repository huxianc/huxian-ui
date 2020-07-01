import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  wait,
} from "@testing-library/react";

import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>dropdown1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createstyleFile = () => {
  const cssFile: string = `
        .submenu{
            display:none;
        }
        .submenu.menu-opened{
            display:none
        }
    `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("test Menu and MenuItem component", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createstyleFile());
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });

  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu test");
    // 会选取下面的所有 li 标签
    // expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });

  it("click items should change active call the right callback", () => {
    const thridItem = wrapper.getByText("xyz");
    fireEvent.click(thridItem);
    expect(thridItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
  });

  it("should render vertical mode when set mode to vertical", () => {
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });

  //   300ms 延迟 异步
  it("should show dropdown items when hover on SubMenu", async () => {
    expect(wrapper.queryByText("dropdown1")).not.toBeVisible();
    const dropdownElement = wrapper.getByText("dropdown");
    fireEvent.mouseEnter(dropdownElement);
    await wait(() => {
      expect(wrapper.queryByText("dropdown1")).toBeVisible();
    });
  });
});
