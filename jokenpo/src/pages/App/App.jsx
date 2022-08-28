import React, {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Tela1 } from '../tela1/Tela1'
import { Tela2 } from '../tela2/Tela2'
import { Tela3 } from '../tela3/Tela3'
import { Tela4 } from '../tela4/Tela4'
import './styles.css'
import { CustomerContext } from '../../components/Contexts/customer'


export function App() {
  const [PartidasOficiais, setPartidasOficiais] = useState([]);
  const [infoPartida, setInfoPartida] = useState([{placarEu: 0, placarPc: 0, numeroPartida: 0 , vencedor: '', meuPlacar:100, pcPlacar: 0}]);
  const [tamanho, setTamanho] = useState('tamanho');
  const [tela, setTela] = useState('');

  const handleSubmit = ({placarEu, placarPc, numeroPartida, vencedor, meuPlacar, pcPlacar})=>{
    const infos = {
      numeroPartida: numeroPartida,
      vencedor: vencedor,
      meuPlacar: meuPlacar,
      pcPlacar: pcPlacar,
      placarEu: infoPartida[infoPartida.length - 1].placarEu + placarEu,
      placarPc: infoPartida[infoPartida.length - 1].placarPc + placarPc
    }
    setInfoPartida(prevState => [...prevState, infos]);
    
    if(infoPartida[0].vencedor == ''){
      infoPartida.shift()
    }
  }
  return (
    <div className={'baseDoApp ' + tamanho}>
      <div className='headerDoApp'>
        <h4 className='titulo'>Jokenpo</h4>
        <h5 className='titulo2'>{tela}</h5>
      </div>
      <CustomerContext.Provider value={{PartidasOficiais, setPartidasOficiais, infoPartida, submit: handleSubmit, setTamanho, setTela}}>
        <Router>
          <Routes>
            <Route path="/" element={<Tela1/>}/>
            <Route path="/tela2/:id/:idpc/:partida" element={<Tela2/>}/>
            <Route path="/tela3/" element={<Tela3/>}/>
            <Route path="/tela4/" element={<Tela4/>}/>
          </Routes>
        </Router>
      </CustomerContext.Provider>
      <footer className='footerDoApp'>
        <div>
          <label htmlFor="" className='desenvolvido'>Desenvolvido por:</label>
          <label htmlFor=""> Davi Alves</label>
        </div>  
      </footer>
    </div>
  )
}

