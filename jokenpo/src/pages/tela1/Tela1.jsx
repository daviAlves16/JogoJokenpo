import React, {useState, useEffect} from 'react'
import './Tela1.css'
import {Link} from 'react-router-dom'
import { Card } from '../../components/Card/Card'

export function Tela1() {
  const [personagens, setPersonagens] = useState([]);
  var cont = 0

  function criar(){
      const newPersonage = {
      name: "Batman",
      imgPersonagem: 1
      }
      setPersonagens(prevState => [...prevState, newPersonage]);
  }
  
  useEffect(() =>{
    if(cont == 0){
      criar();
      cont++
    }
  }, []);

  return (
    <div className='baseTela1'>
        <h1>Tela 1</h1>
        
        {
          personagens.map(personagem => <Card name={personagem.name} link={personagem.imgPersonagem}/>)
        }
        
       <Link to="/tela2"><input type="button" value="COMEÇAR"/></Link>
    </div>
  )
}
