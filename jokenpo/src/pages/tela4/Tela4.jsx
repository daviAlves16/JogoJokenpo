import React, {useContext, useEffect, useState} from 'react';
import './Tela4.css'
import {Link} from 'react-router-dom'
import { CustomerContext } from '../../components/Contexts/customer';
import { Resultados } from '../../components/Resultados/Resultados';

export function Tela4() {
    const {PartidasOficiais} = useContext(CustomerContext)
    const {setTamanho} = useContext(CustomerContext)
    console.log(PartidasOficiais)
    var cont = 0
    useEffect(() =>{
      if(cont == 0){
        cont++
        setTamanho('')
      }
    }, []);

  return (
    <div className='base4'>
        <div className='headerTela4'>
          <h1>Resultados de Todas as Partidas</h1>
        </div>
        
        {  
          PartidasOficiais.map((rodada, index) =>(
            <Resultados
            indicePartida={index}
            />
          ))
        }
        
        
        <Link to="/">
            <button type='button'>Jogar Novamente</button>
        </Link>
    </div>
  );
}