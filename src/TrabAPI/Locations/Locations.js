import React from "react";
import api from "../services/api";
import { Collapse } from "../componentes/Collapse/Collapse";

import "./Locations.css";

export default class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalLocations: [],
      locations: [],
    };
  }

  componentDidMount = () => {
    api
      .get("/location")
      .then((response) => {
        this.setLocations(response.data.results)

        response.data.results.forEach(item => {
          //Calback para setar valor de characters e aguardar retorno da api
          let callBack = (r) => {

            let residents = this.setArrayResidentImages(r)

            item.residents = residents;
            this.setLocations(response.data.results)
          }

          this.getResidentsImages(item.residents, callBack);
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

    residents.forEach(item => {
      url += item.split("https://rickandmortyapi.com/api/character/")[1] + ", ";
    });

    api.get(url).then((response) => {

      if (typeof (callBack) == "function") {
        callBack(response.data)
      }
      // return response.data.name
    }).catch((err) => {
      console.error("ops! Não foi possível carregar os dados da api." + err);
    });
  }

  setArrayResidentImages = (residents) => {
    return residents.map(function (a) {
      return a.image
    })
  }

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
    const { locations } = this.state;

    let collapses = locations.map((item) => (
      <Collapse id={item.id}
        name={item.name}
        type={item.type}
        dimension={item.dimension}
        residents={item.residents}
        onClick={() => null} />
    ));

    return (
      <div className="body">
        <h2>Locations</h2>

        <div className="locations">
          {collapses}
        </div>
      </div>
    );
  }
}
