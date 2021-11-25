import React from "react";
import { Card } from "../componentes/Card/Card";
import api from "../services/api";

import "./About.css";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
    };
  }

  componentDidMount() {
    api
      .get("character/1,183,7")
      .then((response) => {
        this.setState({
          characters: response.data,
        });
      })
      .catch((err) => {
        console.error("ops! Não foi possível carregar os dados da api." + err);
      });
  }

  render() {
    let cards = this.state.characters.map((item, i) => (
      <Card
        name={item.name}
        image={item.image}
        status={item.status}
        lastLocation={item.origin.name}
        firstSeen={item.episode[0]}
        onClick={() => null}
      />
    ));

    return (
      <div>
        <h2>Characters</h2>
        {cards}
      </div>
    );
  }
}
