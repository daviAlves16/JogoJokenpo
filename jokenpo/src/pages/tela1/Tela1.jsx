import React, {useState, useEffect, useContext} from 'react'
import axios from "axios";
import './Tela1.css'
import {Link} from 'react-router-dom'
import { Card } from '../../components/Card/Card'
import { CustomerContext } from '../../components/Contexts/customer';

export function Tela1() {
  const {setTamanho} = useContext(CustomerContext)
  const [personagens, setPersonagens] = useState([]);
  var cont = 0
  var ids = []
  var test = 0
  var partida = 1
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
          url: "/tela2/" + response.data[i].id +"/"+ ids[test] + "/" + partida
          }
          setPersonagens(prevState => [...prevState, newPersonage]);
          
      }
      
    })
  }
  
  useEffect(() =>{
    if(cont == 0){
      criar();
      cont++
      setTamanho('tamanho')
    }
  }, []);

  return (
    <div className='baseTela1'>
        <div className='introducao'>
          <div>
          <h1>Bem Vindos ao jogo de teste Jokenpo!</h1>
          <h3 className='margimText'>Para começar o jogo, clique no personagem com quem você deseja jogar! O computador escolherá outro personagem para batalhar com você!</h3>
          <h4 className='margimText'>Boa sorte!</h4>
          </div>
        </div>
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
