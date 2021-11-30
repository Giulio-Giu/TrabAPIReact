import React from "react";

import "./Botao.css";

export class Botao extends React.Component {
  render() {
    const { onClick, children } = this.props;
    return (
      <div>
        <button onClick={() => onClick()}>{children}</button>
      </div>
    );
  }
}
