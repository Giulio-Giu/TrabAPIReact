import React from "react";
import api from "../services/api";

export default class Episodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalEpisodes: [],
      episodes: [],
    };
  }

  componentDidMount() {
    api
      .get("/episode")
      .then((response) => this.setEpisodes(response.data.results));
  }

  setEpisodes(data) {
    this.setState({
      originalEpisodes: data,
      episodes: data,
    });
  }

  search(text) {
    const { originalEpisodes } = this.state;
    const filteredData = originalEpisodes.filter((episode) =>
      episode.name.toLowerCase().includes(text.toLowerCase())
    );
    this.setState({
      episodes: filteredData,
    });
  }

  render() {
    const { episodes } = this.state;

    return (
      <div className="body">
        <div className="Episodes">
          <h2>Episodes</h2>
          <input onChange={(e) => this.search(e.target.value)} />
          <ul>
            {episodes.map((item) => (
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
                  <strong>Air Date: </strong>
                  {item.air_date}
                </p>
                <p>
                  <strong>Episode: </strong>
                  {item.episode}
                </p>

                <br />
              </li>
            ))}
          </ul>
        </div>
      </div>

    );
  }
}
