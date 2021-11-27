import React from "react";
import api from "../services/api";

export default class Locations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalLocations: [],
      locations: [],
    };
  }

  componentDidMount() {
    api
      .get("/location")
      .then((response) => this.setLocations(response.data.results));
  }

  setLocations(data) {
    this.setState({
      originalLocations: data,
      locations: data,
    });
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

  render() {
    const { locations } = this.state;

    return (
      <div className="Locations">
        <h2>Locations</h2>
        <input onChange={(e) => this.search(e.target.value)} />
        <ul>
          {locations.map((item) => (
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
                <strong>Type: </strong>
                {item.type}
              </p>
              <p>
                <strong>Dimension: </strong>
                {item.dimension}
              </p>

              <br />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
