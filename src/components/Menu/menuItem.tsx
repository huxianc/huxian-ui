import React, { useContext } from "react";
import classnames from "classnames";
import { MenuContext } from "./menu";

type MenuMode = "horizontal" | "vertical";

export interface MenuItemProps {
  index: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: number) => void;
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const classes = classnames("huxian-menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });
  const handleClick = () => {
    if (context.onSelect && !disabled) {
      context.onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

// MenuItem.defaultProps = {
//   index: 0,
// };

export default MenuItem;
