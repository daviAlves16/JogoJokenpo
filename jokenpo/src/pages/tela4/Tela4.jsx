import React, {useContext, useEffect, useState} from 'react';
import './Tela4.css'
import {Link} from 'react-router-dom'
import { CustomerContext } from '../../components/Contexts/customer';
import { Resultados } from '../../components/Resultados/Resultados';

export function Tela4() {
  const {PartidasOficiais} = useContext(CustomerContext)
  const {setTamanho} = useContext(CustomerContext)
  const {setTela} = useContext(CustomerContext)
  const {infoPartida} = useContext(CustomerContext)
  var cont = 0
    
  useEffect(() =>{
    if(cont == 0){
      setTela('Resultado das Partidas')
      cont++
      setTamanho('')
    }
  }, []);

  return (
    <div className='base4'>
      <div className='headerTela4'>  
        <div className='headerTela42'>
          <div style={{width: '40%'}}><h4 className='fonts4'>Resultado Total</h4></div>
          <div className='headerTela43'>
            <div><h4 className='fonts4'>Eu</h4></div>
            <div><h4>{infoPartida[infoPartida.length - 1].placarEu}</h4></div>
            <div><h4 className='fonts4'>X</h4></div>
            <div><h4>{infoPartida[infoPartida.length - 1].placarPc}</h4></div>
            <div><h4 className='fonts4'>PC</h4></div>
          </div>
        </div>

        <Link to="/">
          <button type="button" class="btn btn-primary fonts4">Jogar Novamente</button>
        </Link>
      </div>
      {  
        PartidasOficiais.map((rodada, index) =>(
          <Resultados
            indicePartida={index}
          />
        ))
      }
      <Link to="/">
        <button type="button" class="btn btn-primary btnTela4 fonts4">Jogar Novamente</button>
      </Link>
    </div>
  );
}