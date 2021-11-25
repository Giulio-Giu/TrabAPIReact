import React from 'react';

import './Botao.css';

export class Botao extends React.Component {
    render() {
        const { name, onClick } = this.props;
        return (
            <div>
               <button onClick={()=>onClick()}>{name}</button>
            </div>
        );
    }
}
