import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas} from '@fortawesome/free-solid-svg-icons'
// import Button, { ButtonType, ButtonSize } from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

library.add(fas)


function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Menu
          mode='horizontal'
          onSelect={index => {
            console.log(index);
          }}
          defaultOpenSubMenus={['2']}
        >
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem>cool link3</MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;
