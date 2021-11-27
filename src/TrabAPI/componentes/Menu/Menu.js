import React from "react";
import { Link } from "react-router-dom";

import "./Menu.css";

export class Menu extends React.Component {
  render() {
    return (
      <div>
        <div className="menu">
          <div>
            <div className="menuItens">
              <div >
                <Link to="/">About</Link>
              </div>
              <div>
                <Link to="/Characters">Characters</Link>
              </div>
              <div>
                <Link to="/Episodes">Episodes</Link>
              </div>
              <div>
                <Link to="/Locations">Locations</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
