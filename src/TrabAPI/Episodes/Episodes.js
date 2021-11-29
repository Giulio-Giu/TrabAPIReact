import React from "react";
import api from "../services/api";

export default class Episodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalEpisodes: [],
      episodes1: [],
      episodes2: [],
      episodes3: [],
      season01: [],
      season02: [],
      season03: [],
      season04: [],
      season05: [],
      currentSeason: {},
      previousSeason: null,
      showSeason: false,
    };
  }

 async componentDidMount() {
    // api.get("/episode").then((response) => console.log(response.data.results));

    // callEpisodes()
    // let resp = await api.get("/episode");
    // let body = await resp.json()


    api.get("/episode").then((response) => this.setEpisodes1(response.data.results));
    api.get("/episode?page=2").then((response) => this.setEpisodes2(response.data.results));
    api.get("/episode?page=3").then((response) => this.setEpisodes3(response.data.results));
  }

  setEpisodes1(data1) {
    this.setState({episodes1: data1,});
    // console.log("episodes1: ", data1)
  }

  setEpisodes2(data2) {
    this.setState({episodes2: data2,});
    // console.log("episodes2: ", data2)
  }

  setEpisodes3(data3) {
    this.setState({episodes3: data3,});
    // console.log("episodes3: ", data3)

    this.fillSeasons();
  }
  
  fillSeasons(){
    setTimeout(function() { 

    const {episodes1, episodes2, episodes3, season01, season02, season03, season04, season05} = this.state

    episodes1.map((item) => {
      if (item.episode.includes("S01")){
        season01.push(item)
      } else{
        season02.push(item)
      }
    })

    episodes2.map((item) => {
      if (item.episode.includes("S02")){
        season02.push(item)
      } else if(item.episode.includes("S03")){
        season03.push(item)
      } else {
        season04.push(item)
      }
    })

    episodes3.map((item) => {
      if (item.episode.includes("S04")){
        season04.push(item)
      } else {
        season05.push(item)
      }
    })
      
  }.bind(this), 2000)  
}

setSeason(newSeason) {
  let eps = []
  
  switch (newSeason) {
    case "S01": {
      eps = this.state.season01
    } break;
    case "S02": {
      eps = this.state.season02
    } break;
    case "S03": {
      eps = this.state.season03
    } break;
    case "S04": {
      eps = this.state.season04
    } break;
    case "S05": {
      eps = this.state.season05
    } break;
  }

  // console.log(eps)
  // console.log(this.state.previousSeason)
  // console.log("curr === curr", eps === this.state.currentSeason)
  // console.log("curr === prev", eps === this.state.previousSeason)


  if (this.state.showSeason && eps === this.state.currentSeason.eps) {
    this.setState({showSeason: false})
  } else {
    this.setState({
      currentSeason: {name: newSeason, eps: eps},
      showSeason: true,
    })
  }

  // switch (season) {
  //   case "S01": {
  //     this.setState({
  //       previousSeason: this.state.currentSeason,
  //       currentSeason: this.state.season01,
  //       showSeason: true
  //     })
  //   } break;
  //   case "S02": {
  //     this.setState({
  //       previousSeason: this.state.currentSeason,
  //       currentSeason: this.state.season02,
  //       showSeason: true
  //     })
  //   } break;
  //   case "S03": {
  //     this.setState({
  //       previousSeason: this.state.currentSeason,
  //       currentSeason: this.state.season03,
  //       showSeason: true
  //     })
  //   } break;
  //   case "S04": {
  //     this.setState({
  //       previousSeason: this.state.currentSeason,
  //       currentSeason: this.state.season04,
  //       showSeason: true
  //     })
  //   } break;
  //   case "S05": {
  //     this.setState({
  //       previousSeason: this.state.currentSeason,
  //       currentSeason: this.state.season05,
  //       showSeason: true
  //     })
  //   } break;
  // }
}

  render() {
    const {currentSeason} = this.state;

    // const { season01, season02, season03, season04, season05 } = this.state;
    // console.log("1: ", this.state.season01);
    // console.log("2: ", this.state.season02);
    // console.log("3: ", this.state.season03);
    // console.log("4: ", this.state.season04);
    // console.log("5: ", this.state.season05);

    return (
      <div className="body">
        <div className="Episodes">
          <h2>Episodes</h2>

          <button onClick={() => this.setSeason("S01")}>SEASON 1</button>
          <button onClick={() => this.setSeason("S02")}>SEASON 2</button>
          <button onClick={() => this.setSeason("S03")}>SEASON 3</button>
          <button onClick={() => this.setSeason("S04")}>SEASON 4</button>
          <button onClick={() => this.setSeason("S05")}>SEASON 5</button>

          {this.state.showSeason && 
          <ul>
            {currentSeason.eps.map((item, index) => {
              const indexStr = index < 9 ? `${currentSeason.name}E0${index+1}` : `${currentSeason.name}E${index+1}`;
              
              return <li key={item.id}>
                <p>
                  <strong>ID: </strong>
                  {indexStr}
                </p>
                <p>
                  <strong>Name: </strong>
                  {item.name}
                </p>
                <p>
                  <strong>Air Date: </strong>
                  {item.air_date}
                </p>
                {/* <p>
                  <strong>Episode: </strong>
                  {item.episode}
                </p> */}

                <br />
              </li>
            })}
          </ul>
          }
   
        </div>
      </div>

    );
  }
}
