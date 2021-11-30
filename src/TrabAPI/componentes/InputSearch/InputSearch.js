import React from "react";

import "./InputSearch.css";

export class InputSearch extends React.Component {
  render() {
    const { name, onChange } = this.props;
    return (
      <div className="formInput">
        <input
          type="text"
          className="inputSearch"
          placeholder={name}
          onChange={(e) => onChange(e)}
        />
      </div>
    );
  }
}
