/* eslint-disable array-callback-return */
import React from "react";
import { Botao } from "../componentes/Botao/Botao";
import api from "../services/api";
import "./Episodes.css";

export default class Episodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      season01: [],
      season02: [],
      season03: [],
      season04: [],
      season05: [],
      currentSeason: props.emptyObject,
      showSeason: false,
      loaded: false,
    };
  }

  //fazendo as 3 chamadas necessárias para pegar todos os episódios e depois fazer um map
  //para adicionar os eps certos à cada temporada

  //forçando com await para que não corra o risco de pegar uma variável sem ter preenchido o valor
  async componentDidMount() {
    this.setState({
      currentSeason: { name: "", eps: [] },
    });

    let resp1 = await api.get("/episode");
    let resp2 = await api.get("/episode?page=2");
    let resp3 = await api.get("/episode?page=3");

    //após as chamadas, passar a lista de episódios para fazer o preenchimento das temporadas
    this.fillSeasons(
      resp1.data.results,
      resp2.data.results,
      resp3.data.results
    );

    //retirar o loading da tela
    this.setState({
      loaded: true,
    });
  }

  //mandando cada lista de episodio para fazer a validação
  fillSeasons(episodes1, episodes2, episodes3) {
    episodes1.forEach((element) => {
      this.verifySeason(element);
    });

    episodes2.forEach((element) => {
      this.verifySeason(element);
    });

    episodes3.forEach((element) => {
      this.verifySeason(element);
    });

    this.setSeason("S01");
  }

  //verificando cada episodio para adicioná-lo em sua respectiva temporada
  verifySeason(item) {
    const { season01, season02, season03, season04, season05 } = this.state;

    if (item.episode.includes("S01")) {
      season01.push(item);
    } else if (item.episode.includes("S02")) {
      season02.push(item);
    } else if (item.episode.includes("S03")) {
      season03.push(item);
    } else if (item.episode.includes("S04")) {
      season04.push(item);
    } else {
      season05.push(item);
    }
  }

  //alterando para exibir a temporada que foi clicada
  setSeason(newSeason) {
    let eps = [];

    switch (newSeason) {
      case "S01":
        eps = this.state.season01;
        break;
      case "S02":
        eps = this.state.season02;
        break;
      case "S03":
        eps = this.state.season03;
        break;
      case "S04":
        eps = this.state.season04;
        break;
      case "S05":
        eps = this.state.season05;
        break;
      default:
        eps = this.state.season01;
    }

    //saber se é para fechar a temporada que foi aberta, ficando semelhante a um collapse
    if (this.state.showSeason && eps === this.state.currentSeason.eps) {
      this.setState({ showSeason: false });
    } else {
      this.setState({
        currentSeason: { name: newSeason, eps: eps },
        showSeason: true,
      });
    }
  }

  render() {
    const { currentSeason, loaded } = this.state;

    //botoes das temporadas
    const buttons = (
      <div style={{ display: "flex" }}>
        <Botao onClick={() => this.setSeason("S01")}>Season 1</Botao>
        <Botao onClick={() => this.setSeason("S02")}>Season 2</Botao>
        <Botao onClick={() => this.setSeason("S03")}>Season 3</Botao>
        <Botao onClick={() => this.setSeason("S04")}>Season 4</Botao>
        <Botao onClick={() => this.setSeason("S05")}>Season 5</Botao>
      </div>
    );

    //card com as informações de cada episódio
    let episodesCards = currentSeason.eps.map((item) => (
      <li key={item.id} className="episodeCard">
        <h3>{item.episode}</h3>
        <h3 className="epName">{item.name}</h3>
        <p>
          <strong>Air Date: </strong>
          {item.air_date}
        </p>
      </li>
    ));

    //se já carregou, exibe o conteúdo, se não, exibe o loading
    return loaded ? (
      <div className="body">
        <div className="Episodes">
          {buttons}

          {/* mostra apenas se já estiver habilitado, para fazer o collapse */}
          {this.state.showSeason && (
            <ul>
              <h2 className="titleEpisodes">Episodes</h2>
              {episodesCards}
            </ul>
          )}
        </div>
      </div>
    ) : (
      <div className="loader"></div>
    );
  }
}
