import * as React from 'react';
import { Menu } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import { NavLink } from "react-router-dom";

export interface INavigationProps {
}

export interface INavigationState {
}

export default class Navigation extends React.Component<INavigationProps, INavigationState> {
  constructor(props: INavigationProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
        <Menu style={{ width: "100%" }} mode="horizontal">
        <MenuItem>
          <NavLink exact to="/">
            Home
          </NavLink>
        </MenuItem>
        <MenuItem>
        <NavLink exact to="/purchasesSummary">Purchases Summary</NavLink>
        </MenuItem>
        <MenuItem>
        <NavLink exact to="/products">Products</NavLink>
        </MenuItem>
        <MenuItem>
        <NavLink exact to="/clientsSummary">Clients summary</NavLink>
        </MenuItem>
        </Menu>
    );
  }
}
