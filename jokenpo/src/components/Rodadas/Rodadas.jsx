import React from 'react';
import './Rodadas.css'

export function Rodadas(props) {
  return (
    <div className='rodadasBase'>
      <div className='imagemBase'>
        <img src={props.imgMeuJogador} alt="" width='100%' height="100%"/>
      </div>
      <div><img src={props.urlMinhaJogada} alt="" width='70vw' height='70vw'/></div>
      <div><img src={props.imgResultado} alt="" width='70vw' height='70vw'/></div>
      <div><img src={props.urlPcJogada} alt="" width='70vw' height='70vw'/></div>
      <div className='imagemBase'>
        <img src={props.imgPcJogador} alt="" width='100%' height="100%"/>
      </div>
    </div>
  );
}