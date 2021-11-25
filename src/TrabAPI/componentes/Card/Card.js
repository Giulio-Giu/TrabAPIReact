import React from "react";

import "./Card.css";

export class Card extends React.Component {
  render() {
    const { name, image, status, lastLocation, firstSeen, onClick } =
      this.props;
    return (
      <div>
        <div className="card">
          <div className="cardImage">
            <img src={image} alt={name} />
          </div>
          <div className="cardBody">
            <div className="cardTitle">{name}</div>
            <div className="status">{status}</div>
            <div className="cardInfo">
              {lastLocation}
              {firstSeen}
            </div>
          </div>
        </div>
        {/* <button onClick={()=>onClick()}>{name}</button> */}
      </div>
    );
  }
}
