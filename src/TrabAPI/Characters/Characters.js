import React from "react";
import api from "../services/api";
import { Card } from "../componentes/Card/Card";

import "./Characters.css";


export default class Characters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalCharacters: [],
      characters: [],
    };
  }

  componentDidMount() {
    api
      .get("/character")
      .then((response) => this.setCharacters(response.data.results));
  }

  setCharacters(data) {
    this.setState({
      originalCharacters: data,
      characters: data,
    });
  }

  search(text) {
    const { originalCharacters } = this.state;
    const filteredData = originalCharacters.filter((character) =>
      character.name.toLowerCase().includes(text.toLowerCase())
    );
    this.setState({
      characters: filteredData,
    });
  }

  render() {
    const { characters } = this.state;
    let cards = characters.map((item) => (
      <Card
        name={item.name}
        image={item.image}
        status={item.status}
        origin={item.origin.name}
        species={item.species}
        gender={item.gender}
        lastLocation={item.location.name}
        // firstSeen={item.episode[0]}
        onClick={() => null}
      />
    ));

    return (
      <div className="Characters">
        <h2>Characters</h2>
        <input onChange={(e) => this.search(e.target.value)} />
          <div className="cards">
              {cards}
          </div>
       </div>
    )
  }
}