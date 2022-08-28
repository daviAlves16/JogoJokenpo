import React, {useContext, useEffect, useState} from 'react';
import './Tela3.css'
import {Link} from 'react-router-dom'
import { CustomerContext } from '../../components/Contexts/customer';
import { Resultados } from '../../components/Resultados/Resultados';

export function Tela3() {
  const {PartidasOficiais} = useContext(CustomerContext)
  const {setTamanho} = useContext(CustomerContext)
  const {setTela} = useContext(CustomerContext)
  const {infoPartida} = useContext(CustomerContext)
  var cont = 0

  useEffect(() =>{
    if(cont == 0){
      setTela('Resultado da Partida')
      cont++
      setTamanho('')
      console.log(PartidasOficiais)
    }
  }, []);

  return (
    <div className='base'>
      <div className='headerTela3'>
        <div className='headerTela32'>
          <div style={{width: '40%'}}><h4 className='fonts2'>Resultado Total</h4></div>
          <div className='headerTela33'>
            <div><h4 className='fonts2'>Eu</h4></div>
            <div><h4>{infoPartida[infoPartida.length - 1].placarEu}</h4></div>
            <div><h4 className='fonts2'>X</h4></div>
            <div><h4>{infoPartida[infoPartida.length - 1].placarPc}</h4></div>
            <div><h4 className='fonts2'>PC</h4></div>
          </div>
        </div>
      </div>
      <Resultados indicePartida={PartidasOficiais.length - 1}/>
        
      <div className='botoesTela3'>
        <Link to="/">
          <button type="button" class="btn btn-success botoesTela3 fonts2">Jogar Novamente</button>
        </Link>
        <Link to="/tela4">
          <button type="button" class="btn btn-info botoesTela3 fonts2">Ver todas as partidas</button>
        </Link>
      </div>  
    </div>
  );
}