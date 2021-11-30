import React from "react";
import { Card } from "../componentes/Card/Card";
import api from "../services/api";

import "./About.css";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: []
    };
  }

  componentDidMount = () => {

    //Carregando Characters
    let chars = this.setRandomicCharactersId();
    api.get("character/" + chars).then((response) => {
      this.setState({
        characters: response.data
      });


      response.data.forEach(item => {
        let callBack = (r) => {
          item.firstSeen = r;
          this.setState({
            characters: response.data
          });
        }
        this.getFirstSeen(item.episode[0], callBack);
      });

      
    }).catch((err) => {
      console.error("ops! Não foi possível carregar os dados da api." + err)
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
    let cards = this.state.characters.map((item) => (
      <Card
        id={item.id}
        name={item.name}
        image={item.image}
        status={item.status}
        lastLocation={item.origin.name}
        firstSeen={item.firstSeen}
        // onClick={() => null}
      />
    ));

    return (
      <div>
        <div className="lista">
          <div className="header">
            <h1>The Rick <br /> & Morty API</h1>
            {/* <h3>
              Trabalho final React Matheus Thibau Paulino e Giulio Dias Machado
            </h3> */}
          </div>
        </div>
        <div className="body">
          <div className="aboutInfo">
            <h2>About</h2>
            <p>
              Rick and Morty is an American adult animated science fiction sitcom created by Justin Roiland and Dan Harmon for Cartoon Network's nighttime programming block, Adult Swim. The series follows the misadventures of cynical mad scientist Rick Sanchez and his good-hearted, but fretful grandson Morty Smith, who split their time between domestic life and interdimensional adventures.

              Roiland voices the eponymous characters, with Chris Parnell, Spencer Grammer and Sarah Chalke voicing the rest of Rick and Morty's family. The series originated from an animated short parody film of Back to the Future, created by Roiland for Channel 101, a short film festival co-founded by Harmon. The series has been acclaimed by critics for its originality, creativity and humor.

              The fifth season premiered on June 20, 2021, and consisted of ten episodes. A sixth season was confirmed as part of a long-term deal in May 2018 that ordered 70 new episodes over an unspecified number of seasons.
            </p>
          </div>
          <h2>Crazy Characters</h2>
          <div className="cards">
            {cards}
          </div>
        </div>
      </div>
    );
  }
}
