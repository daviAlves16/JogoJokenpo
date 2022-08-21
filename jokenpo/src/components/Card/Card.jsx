import React from 'react';
import './Card.css'

export function Card(props) {
  return (
    <div className='Card'>
        <div className='divImgs'>
            <img className='imgCard' src={props.link} alt=""/>
        </div>
        <div className='divNome'>
            <strong>{props.name}</strong>
        </div>
    </div>
  );
}