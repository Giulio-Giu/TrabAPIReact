import React from "react";
import { Botao } from "./componentes/Botao/Botao";
import About from "./About/About";
import Characters from "./Characters/Characters";
import Locations from "./Locations/Locations";
import Episodes from "./Episodes/Episodes";

import "./TrabAPI.css";

export default class TrabAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      about: false,
    };
  }

  aboutClick = () => {
    this.setState({
      about: true,
    });
  };

  render() {
    const { about } = this.state;

    return (
      <div>
        <div className="lista">
          <h1>The Rick and Morty API</h1>
          <h4>
            Trabalho final React Matheus Thibau Paulino e Giulio Dias Machado
          </h4>

          <div className="menu">
            <div>
              <Botao name="About" onClick={() => this.aboutClick()} />
            </div>
            <div>
              <Botao name="Characters" onClick={() => null} />
            </div>
            <div>
              <Botao name="Locations" onClick={() => null} />
            </div>
            <div>
              <Botao name="Episodes" onClick={() => null} />
            </div>
          </div>
        </div>
        <div className="body">{about === true && <About />}</div>
      </div>
    );
  }
}
