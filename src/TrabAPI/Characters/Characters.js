import React from "react";
import api from "../services/api";
import { Card } from "../componentes/Card/Card";
import { InputSearch } from "../componentes/InputSearch/InputSearch";

import "./Characters.css";


export default class Characters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalCharacters: [],
      characters: [],
      loaded: false,
    };
  }

  componentDidMount() {
    api
      .get("/character")
      .then((response) => {
        this.setCharacters(response.data.results)

        response.data.results.forEach(item => {
          let callBack = (r) => {
            item.firstSeen = r;
            this.setState({
              characters: response.data.results
            });
          }
          this.getFirstSeen(item.episode[0], callBack);
        });

        this.setState({
          loaded: true
        })

      });
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


  getFirstSeen = (url, callBack) => {
    url = url.split("https://rickandmortyapi.com/api/")[1];
    api.get(url).then((response) => {

      if (typeof (callBack) == "function") {
        callBack(response.data.name)
      }
      // return response.data.name
    }).catch((err) => {
      console.error("ops! Não foi possível carregar os dados da api." + err);
    });
  }

  render() {
    const { characters, loaded } = this.state;
    let cards = characters.map((item) => (
      <Card
        name={item.name}
        image={item.image}
        status={item.status}
        origin={item.origin.name}
        species={item.species}
        gender={item.gender}
        lastLocation={item.location.name}
        firstSeen={item.firstSeen}
        onClick={() => null}
      />
    ));

    return (
         loaded ? <div>
          <div className="body">
            <div>
              <h2>Characters</h2>
              <InputSearch name="Search by name..." onChange={(e) => this.search(e.target.value)} />
              <div className="cards">
                {cards}
              </div>
            </div>
          </div>
          </div>
          : <div class="loader"></div>
    )
  }
}