import React from 'react';
import './Card.css'

export function Card(props) {
  return (
    <div className='Card'>
      <div class="card">
        <img className="card-img-top imgCard" src={props.link} alt="Imagem de capa do card"/>
        <div className="card-body divNome">
          <p>{props.name}</p>
        </div>
      </div>
    </div>
  );
}