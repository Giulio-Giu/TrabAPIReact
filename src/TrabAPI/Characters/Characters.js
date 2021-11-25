import React from "react";
import api from "../services/api";

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

    return (
      <div className="Characters">
        <h1>Characters</h1>
        <input onChange={(e) => this.search(e.target.value)} />
        <ul>
          {characters.map((item) => (
            <li key={item.id}>
              <p>
                <strong>ID: </strong>
                {item.id}
              </p>
              <p>
                <strong>Name: </strong>
                {item.name}
              </p>
              <p>
                <strong>Status: </strong>
                {item.status}
              </p>
              <p>
                <strong>Specie: </strong>
                {item.species}
              </p>
              <p>
                <strong>Gender: </strong>
                {item.gender}
              </p>
              <p>
                <strong>Origin: </strong>
                {item.origin.name}
              </p>
              <p>
                <strong>Last known location: </strong>
                {item.location.name}
              </p>
              <img src={item.image} alt={item.name} />

              <br />
              <br />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
