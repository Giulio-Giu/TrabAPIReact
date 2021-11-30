import React from "react";

import "./CardVert.css";

export class CardVert extends React.Component {
  render() {
    const { name, type, dimension, residents } = this.props;

    let residentsHTML = "";

    residents.forEach((element) => {
      residentsHTML += `<img src="${element}" alt=${element} className="thumbnail"/>`;
    });

    return (
      <div>
        <div className="cardVert">
          <div className="cardVertTitle">
            <h3 className="cardVertH3">{name}</h3>
          </div>
          <div className="cardVertBody">
            <div className="cardVertInfos">
              Type: {type} <br />
              Dimension: {dimension}
            </div>
            <div className="residentPhotos">
              Residents:
              <div dangerouslySetInnerHTML={{ __html: residentsHTML }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
