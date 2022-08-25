import React from 'react';
import './Rodadas.css'

export function Rodadas(props) {
  return (
    <div className='rodadasBase'>
        <div className='imagemBase'>
            <img src={props.imgMeuJogador} alt="" width='100%' height="100%"/>
        </div>
        <div>{props.minhaJogada}</div>
        <div>{props.result}</div>
        <div>{props.pcJogada}</div>
        <div className='imagemBase'>
        <img src={props.imgPcJogador} alt="" width='100%' height="100%"/>
        </div>
    </div>
  );
}