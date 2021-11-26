import React from "react";
import { Card } from "../componentes/Card/Card";
import api from "../services/api";

import "./About.css";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      firstSeen: null
    };
  }

  componentDidMount = () => {
    let chars = this.setRandomicCharactersId();
    api.get("character/" + chars).then((response) => {
      // this.getFirstSeen(response.data.episode[0]).then((i) => {
      this.setState({
        characters: response.data,
        // firstSeen: i
      });
      // })
    }).catch((err) => {
      console.error("ops! Não foi possível carregar os dados da api." + err);
    });
  }

  setRandomicCharactersId = () => {
    let charsIds = "";
    //Retorna 4 IDS aleatorios de 0 a 100
    for (let i = 0; i < 4; i++) {
      charsIds += (Math.floor(Math.random() * 800) + 1) + ",";
    }
    return charsIds
  }

  getFirstSeen = (url) => {
    url = url.split("https://rickandmortyapi.com/api/")[1];
    api.get(url).then((response) => {
      return response.data.name
    }).catch((err) => {
      console.error("ops! Não foi possível carregar os dados da api." + err);
    });
  }

  render() {
    let firstSeen = this.state.firstSeen;
    let cards = this.state.characters.map((item, i) => (
      <Card
        name={item.name}
        image={item.image}
        status={item.status}
        lastLocation={item.origin.name}
        firstSeen={firstSeen}
        // firstSeen={item.episode[0]}
        onClick={() => null}
      />
    ));

    return (
      <div>
        <h2>Characters</h2>
        <div className="cards">
          {cards}
        </div>
      </div>
    );
  }
}
