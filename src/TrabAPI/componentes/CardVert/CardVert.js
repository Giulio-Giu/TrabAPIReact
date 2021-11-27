import React from "react";

import "./CardVert.css";

export class CardVert extends React.Component {

  render() {
    const { name, image, status, origin, species, gender, lastLocation, firstSeen, onClick } = this.props;
    return (
      <div>
        <div className="cardVert">
          <div className="cardImage">
            <img src={image} alt={name} />
          </div>
          <div className="cardBody">
            <div className="cardTitle">{name}</div>
            <div className="status"><ul><li className={status}>{status}</li></ul></div>
            <div className="cardInfo">
              Last Location
              <p>{lastLocation}</p>
              {firstSeen}
            </div>
          </div>
        </div>
        {/* <button onClick={()=>onClick()}>{name}</button> */}
      </div>
    );
  }
}
