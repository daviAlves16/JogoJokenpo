import React from 'react';
import './Card2.css'

export function Card2(props) {
  return (
    <div className='Card2'>
        <div className='divNome2'>
            <strong>{props.name}</strong>
        </div>
        <div className='divImgs2'>
            <img className='imgCard2' src={props.link} alt="" width="100%" height="100%"/>
        </div>
    </div>
  );
}