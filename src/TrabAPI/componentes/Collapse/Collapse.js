import React from "react";

import "./Collapse.css";

export class Collapse extends React.Component {
  render() {
    const { id, name, type, dimension, residents, onClick } = this.props;
    
    let residentsHTML = ""
    
    residents.forEach(element => {
      residentsHTML += `<img src="${element}" alt=${element} className="thumbnail"/>`
    })

    return (
      <div>
        <div className="collapse">
          <div className="collapseTitle">
            <h3>{name}</h3>
          </div>
          <div className="collapseBody">
            <div className="collapseInfos">
              Type: {type} <br />
              Dimension: {dimension}
            </div>
            <div className="residentPhotos">
              Residents:
              <div dangerouslySetInnerHTML={{ __html: residentsHTML }}></div>
            </div>
          </div>
        </div>
        {/* <button onClick={()=>onClick()}>{name}</button> */}
      </div>
    );
  }
}
