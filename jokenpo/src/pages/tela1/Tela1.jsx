import React, {useState, useEffect} from 'react'
import axios from "axios";
import './Tela1.css'
import {Link} from 'react-router-dom'
import { Card } from '../../components/Card/Card'

export function Tela1() {

  const [personagens, setPersonagens] = useState([]);
  var cont = 0
  var ids = []
  var test = 0

  function criar(){

    axios.get('http://localhost:3000/buscar', {
    })
    .then((response) => {
      for(let i = 0; i <response.data.length; i++){
        ids.push(response.data[i].id)
      }
      test = Math.floor(Math.random() * ids.length);
     
      

      for(let i = 0; i <response.data.length; i++){
        const newPersonage = {
          id: response.data[i].id,
          name: response.data[i].nome,
          imgPersonagem: response.data[i].imagem,
          url: "/tela2/" + response.data[i].id +"/"+ ids[test]
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
          
          personagens.map(personagem => (
            <Link key={personagem.id} to={personagem.url}>
              
              <Card
                name={personagem.name} 
                link={personagem.imgPersonagem} 
              />

            </Link>
          ))
        }
        
        </div>
       
    </div>
  )
}
