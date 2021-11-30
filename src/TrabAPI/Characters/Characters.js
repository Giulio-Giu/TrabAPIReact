import React from "react";
import api from "../services/api";
import { Card } from "../componentes/Card/Card";
import { InputSearch } from "../componentes/InputSearch/InputSearch";

import "./Characters.css";

export default class Characters extends React.Component {
  //Metodo construtor
  constructor(props) {
    super(props);
    this.state = {
      originalCharacters: [],
      characters: [],
      loaded: false,
    };
  }

  //Responsável pelo carregamento dos dados da API
  componentDidMount() {
    api.get("/character").then((response) => {
      this.setCharacters(response.data.results);

      //Após carregar os personagens busco o primeiro episodio para personagem
      response.data.results.forEach((item) => {
        //Função callback definida pega resultado da API e seta no objeto do personagem
        let callBack = (r) => {
          item.firstSeen = r;
          this.setState({
            characters: response.data.results,
          });
        };
        //Carrega episódios do personagem
        this.getFirstSeen(item.episode[0], callBack);
      });

      this.setState({
        loaded: true,
      });
    });
  }

  setCharacters(data) {
    this.setState({
      originalCharacters: data,
      characters: data,
    });
  }

  //Pesquisa de personagem por nome
  search(text) {
    const { originalCharacters } = this.state;
    const filteredData = originalCharacters.filter((character) =>
      character.name.toLowerCase().includes(text.toLowerCase())
    );
    this.setState({
      characters: filteredData,
    });
  }

  //API para buscar episódios do personagem
  getFirstSeen = (url, callBack) => {
    url = url.split("https://rickandmortyapi.com/api/")[1]; //Split para pegar rota correta e remover prefixo já definido previamente
    api
      .get(url)
      .then((response) => {
        if (typeof callBack == "function") {
          callBack(response.data.name);
        }
        // return response.data.name
      })
      .catch((err) => {
        console.error("ops! Não foi possível carregar os dados da api." + err);
      });
  };

  render() {
    const { characters, loaded } = this.state;

    //Percorre personagems para montar cards para cada personagem
    let cards = characters.map((item) => (
      <Card
        key={item.name}
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
      //verifica se está em carregamento para exibir loading ou conteúdo
      loaded ? (
        <div>
          <div className="body">
            <div>
              <h2>Characters</h2>
              <InputSearch
                name="Search by name..."
                onChange={(e) => this.search(e.target.value)}
              />
              <div className="cards">{cards}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader"></div>
      )
    );
  }
}
