import React from 'react';
import './Tela3.css'
import {Link} from 'react-router-dom'

export function Tela3() {
  return (
    <div>
        <h1>Tela 3</h1>
        <Link to="/">
            <button type='button'>Jogar Novamente</button>
        </Link>
    </div>
   
  );
}