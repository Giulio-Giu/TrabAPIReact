import React from "react";
import api from "../services/api";
import { CardVert } from "../componentes/CardVert/CardVert";

import "./Locations.css";

export default class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalLocations: [],
      locations: [],
      loaded: false
    };
  }

  componentDidMount = () => {
    api
      .get("/location")
      .then((response) => {
        this.setLocations(response.data.results)

        response.data.results.forEach(item => {
          //Calback para setar imagens dos personagens e aguardar retorno da api
          let callBack = (r) => {

            let residents = this.setArrayResidentImages(r) //Pega somente as imagens

            item.residents = residents; //Seta array no objeto location
            this.setLocations(response.data.results)
          }

          this.getResidentsImages(item.residents, callBack); //API para buscar imagens dos locations
        });

        this.setState({
          loaded: true
        });
      });
  }

  setLocations = (data) => {
    this.setState({
      originalLocations: data,
      locations: data,
    });
  }

  getResidentsImages = (residents, callBack) => {

    let url = "/character/";

    //Monta rota para cada personagem a ser carregado 
    residents.forEach(item => {
      url += item.split("https://rickandmortyapi.com/api/character/")[1] + ", ";
    });

    api.get(url).then((response) => {

      //Calback para setar valores retornados na API
      if (typeof (callBack) == "function") {
        callBack(response.data)
      }
      // return response.data.name
    }).catch((err) => {
      console.error("ops! Não foi possível carregar os dados da api." + err);
    });
  }

  //Monta array com imagens dos residentes
  setArrayResidentImages = (residents) => {
    return residents.map(function (a) {
      return a.image
    })
  }

  // Busca
  search(text) {
    const { originalLocations } = this.state;
    const filteredData = originalLocations.filter((location) =>
      location.name.toLowerCase().includes(text.toLowerCase())
    );
    this.setState({
      locations: filteredData,
    });
  }

  render = () => {
    const { locations, loaded } = this.state;

    //Percorre os locations para renderizar os cards
    let cards = locations.map((item) => (
      <CardVert id={item.id}
        name={item.name}
        type={item.type}
        dimension={item.dimension}
        residents={item.residents}
        onClick={() => null} />
    ));

    return (
      //Verifica se está carregando dados das APIs 
      loaded ? <div className="body">
        <h2>Locations</h2>

        <div className="locations">
          {cards}
        </div>
      </div>
      : <div className="loader"></div>
    );
  }
}
