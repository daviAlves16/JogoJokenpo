import React, {useContext, useEffect, useState} from 'react';
import './Tela3.css'
import {Link} from 'react-router-dom'
import { CustomerContext } from '../../components/Contexts/customer';
import { Resultados } from '../../components/Resultados/Resultados';

export function Tela3() {
  const {PartidasOficiais} = useContext(CustomerContext)
  const {setTamanho} = useContext(CustomerContext)
  const[rodadas, setRodadas] = useState([])
  const{partida, setPartida} = useState(0)
  var cont = 0

  useEffect(() =>{
    if(cont == 0){
      cont++
      setTamanho('')
    }
  }, []);

  return (
    <div className='base'>
        <div className='headerTela'>
          <h1>Resultados</h1>
        </div>
        
        <Resultados indicePartida={PartidasOficiais.length - 1}/>
        
        <Link to="/">
            <button type='button'>Jogar Novamente</button>
        </Link>

        <Link to="/tela4">
            <button type='button'>Ver todas as partidas</button>
        </Link>
    </div>
   
  );
}