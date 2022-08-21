import React from 'react';
import './Card.css'

export function Card(props) {
  return (
    <div className='Card'>
        <div>
            <h1>{props.link}</h1>
        </div>
        <div className='divNome'>
            <strong>{props.name}</strong>
        </div>
    </div>
  );
}