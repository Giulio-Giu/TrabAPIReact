import React from "react";
import { NavLink } from "react-router-dom";

import "./Menu.css";

export class Menu extends React.Component {
  render() {
    return (
      <div>
        <div className="menu">
          <div>
            <div className="menuItens">
              <div>
                <NavLink exact to="/" activeClassName="active">
                  About
                </NavLink>
              </div>
              <div>
                <NavLink to="/Characters" activeClassName="active">
                  Characters
                </NavLink>
              </div>
              <div>
                <NavLink to="/Episodes" activeClassName="active">
                  Episodes
                </NavLink>
              </div>
              <div>
                <NavLink to="/Locations" activeClassName="active">
                  Locations
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
