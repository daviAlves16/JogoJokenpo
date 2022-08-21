import React, {useState, useEffect} from 'react'
import axios from "axios";
import './Tela1.css'
import {Link} from 'react-router-dom'
import { Card } from '../../components/Card/Card'

export function Tela1() {


  const [personagens, setPersonagens] = useState([]);
  var cont = 0

  function criar(){

    axios.get('http://localhost:3000/buscar', {
    })
    .then((response) => {
      for(let i = 0; i <response.data.length; i++){
        const newPersonage = {
          id: response.data[i].id,
          name: response.data[i].nome,
          imgPersonagem: response.data[i].imagem
          }
          setPersonagens(prevState => [...prevState, newPersonage]);
      }  
    })

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
        <div className='cardsPosition'>
        {
          personagens.map(personagem => <Card name={personagem.name} link={personagem.imgPersonagem}/>)
        }
        
        </div>
       <Link to="/tela2"><input type="button" value="COMEÇAR"/></Link>
    </div>
  )
}
