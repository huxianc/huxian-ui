import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Menu
          mode='vertical'
          onSelect={index => {
            console.log(index);
          }}
        >
          <MenuItem index={0}>cool link</MenuItem>
          <MenuItem index={1} disabled>
            cool link2
          </MenuItem>
          <MenuItem index={2}>cool link3</MenuItem>
        </Menu>

        <Button className='custom'>default</Button>
        <Button disabled>ces</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          测试primary large
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
          danger small
        </Button>
        <Button
          btnType={ButtonType.Link}
          size={ButtonSize.Small}
          href='http://www.baidu.com'
          disabled
        >
          badidu Link
        </Button>
        <Button
          btnType={ButtonType.Link}
          href='http://www.baidu.com'
          target='_blank'
        >
          badidu Link
        </Button>
      </header>
    </div>
  );
}

export default App;
