import React from "react";
import About from "./About/About";
import Characters from "./Characters/Characters";
import Locations from "./Locations/Locations";
import Episodes from "./Episodes/Episodes";
import { Route, BrowserRouter } from "react-router-dom";
import { Menu } from "./componentes/Menu/Menu";

import "./TrabAPI.css";

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <div>
        <Route component={About} exact path="/" />
        <Route component={Characters} path="/Characters" />
        <Route component={Episodes} path="/Episodes" />
        <Route component={Locations} path="/Locations" />
      </div>
    </BrowserRouter>
  )
}
export default Routes;
