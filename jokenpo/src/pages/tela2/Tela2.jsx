import React, {useState, useEffect} from 'react'
import axios from "axios";
import {Link, useParams} from 'react-router-dom'
import { Card2 } from '../../components/Card2/Card2';
import { Movimento } from '../../components/Movimentos/Movimentos';

import './Tela2.css'


export function Tela2() {
  var {id, idpc, partida} = useParams();
  const [numeroPartida, setNumeroPartida] = useState(partida)
  const [personagem, setPersonagem] = useState({id: 0, nome : '', img : ''});
  const [personagemPC, setPersonagemPC] = useState({id: 0, nome : '', img : ''});
  var cont = 0
  var ids = []
  var test = 0
  var moviments = ['Pedra', 'Papel', 'Tesoura']

  const [MinhaJogada, setMinhaJogada] = useState('');
  const [ResultMinhaJogada, setResultMinhaJogada] = useState('');
  const [ResultPcJogada, setResultPcJogada] = useState('');
  const [ResultadoFinal, setResultadoFinal] = useState('');
  const [MeuEstadoPlacar, setMeuEstadoPlacar] = useState(0);
  const [MeuPcPlacar, setMeuPcPlacar] = useState(0);
  const [Modal2, setModal2] = useState("");
  const [RodadasOficiais, setRodadasOficiais] = useState(['?']); 

  var PartidaOficial = []
  //var RodadasOficiais = []

  var MinhaJogada2 = ''
  var PcJogada2 = ''

  function criar(){
    axios.post('http://localhost:3000/buscar1',{
        id: id
      })
      .then((response) => {
        setPersonagem({
          id: response.data.id,
          nome: response.data.nome,
          img: response.data.imagem
        })
      })

      axios.post('http://localhost:3000/buscar1',{
        id: idpc
      })
      .then((response) => {
        setPersonagemPC({
          id: response.data.id,
          nome: response.data.nome,
          img: response.data.imagem
        })
      })
  }

  function acionarModal2(){
    setModal2("#modal2")
  }

 function jogar(){
  setResultMinhaJogada(MinhaJogada)
  MinhaJogada2 = MinhaJogada

  var indice = Math.floor(Math.random() * moviments.length);
  setResultPcJogada(moviments[indice])
  PcJogada2 = moviments[indice]
 
  if(MinhaJogada2 == 'Pedra'){
     
    if(PcJogada2 == 'Pedra'){
      setResultadoFinal('=')

    }else{
      if(PcJogada2 == 'Papel'){
        setResultadoFinal('X')
        setMeuPcPlacar((MeuPcPlacar) => MeuPcPlacar + 1)
        
      }else{
        if(PcJogada2 == 'Tesoura'){
          setResultadoFinal('S2')
          setMeuEstadoPlacar((MeuEstadoPlacar) => MeuEstadoPlacar + 1)
        }
      }
    }
  }else{
    if(MinhaJogada2 == 'Papel'){
      
      if(PcJogada2 == 'Pedra'){
        setResultadoFinal('S2')
        setMeuEstadoPlacar((MeuEstadoPlacar) => MeuEstadoPlacar + 1)
        
      }else{
        if(PcJogada2 == 'Papel'){
          setResultadoFinal('=')
        }else{
          if(PcJogada2 == 'Tesoura'){
            setResultadoFinal('X')
            setMeuPcPlacar((MeuPcPlacar) => MeuPcPlacar + 1)
            
          }
        }
      }
    }else{
      if(MinhaJogada2 == 'Tesoura'){
        
        if(PcJogada2 == 'Pedra'){
          setResultadoFinal('X')
          setMeuPcPlacar((MeuPcPlacar) => MeuPcPlacar + 1)
        }else{
          if(PcJogada2 == 'Papel'){
            setResultadoFinal('S2')
            setMeuEstadoPlacar((MeuEstadoPlacar) => MeuEstadoPlacar + 1)
          }else{
            if(PcJogada2 == 'Tesoura'){
               setResultadoFinal('=')
            }
          }
        }
      }
    }
  }
  if((MeuEstadoPlacar + 1) == 3){
    acionarModal2()
  }else{
    if((MeuPcPlacar + 1) == 3){
      acionarModal2()
    }
  }
  
 }

 function limparSomar(){

  const Rodada = {
    numeroPartida: partida,
    idMeuJogador: id, 
    idPcJogador: idpc,
    tipoMinhaJogada: ResultMinhaJogada,
    tipoPcJogada: ResultPcJogada,
    resultado: ResultadoFinal,
    minhaPontuacao: MeuEstadoPlacar,
    pcPontuacao: MeuPcPlacar
  }

  setRodadasOficiais(prevState => [...prevState, Rodada])
  if(RodadasOficiais == '?'){
    RodadasOficiais.shift()
  }
  console.log(RodadasOficiais)

    setResultMinhaJogada('')
    setResultPcJogada('')
    setResultadoFinal('')


 }
  
  useEffect(() =>{
    if(cont ==0){
    
      if(id == idpc){
      axios.get('http://localhost:3000/buscar', {
      })
      .then((response) => {
        for(let i = 0; i <response.data.length; i++){
          if(response.data[i].id != id){
            ids.push(response.data[i].id)
          }
        }

      test = Math.floor(Math.random() * ids.length);
      idpc = ids[test]
      console.log(idpc)
      criar();
    })
    }else{
      criar();
    }  
      cont++
    }
     
  }, []);

  return (
    <div className='baseTela2'>
       <h1>Partida: {numeroPartida}</h1>
        

        <div className='divCards2'>
        <Card2 
          name={personagem.nome} 
          link={personagem.img}
        />
        
        <div className='divDoJogo'>
          <div className='placares'>
            <div className='divNomePlacar'>
              <h1>Placar</h1>
            </div>

            <div className='placar2'>
              <h3>{personagem.nome}</h3>
              <h1>{MeuEstadoPlacar}</h1>
              <div>X</div>
              <h1>{MeuPcPlacar}</h1>
              <h3>{personagemPC.nome} </h3>
            </div>

          </div>
          
          <div className='movimentosDoJogos'>
            <div className='jogadas'><h1>{ResultMinhaJogada}</h1></div>
            <div className='jogadas'><h1>{ResultadoFinal}</h1></div>
            <div className='jogadas'><h1>{ResultPcJogada}</h1></div>
          </div>
          
        </div>

        <Card2 
          name={personagemPC.nome} 
          link={personagemPC.img}
        />
        </div>

        <div className='divMovimentos'>

          <div className='divMovimentosJogador'>
           
            <input type="button" value="Pedra" onClick={() => setMinhaJogada('Pedra')} className="movimentoItem"/>
            <input type="button" value="Papel" onClick={() => setMinhaJogada('Papel')} className="movimentoItem"/>
            <input type="button" value="Tesoura" onClick={() => setMinhaJogada('Tesoura')} className="movimentoItem"/>
          </div>

          <div className='divBotaoJogar'>
            <button type="button" class="btn btn-primary botaoJogar" onClick={jogar} data-toggle="modal" data-target="#modalExemplo">
              Jogar
            </button>
          </div>

          <div className='divMovimentoPc'>
            <div>
              <input type="button" value={RodadasOficiais[RodadasOficiais.length - 1].tipoPcJogada} className="movimentoItem"/>
            </div>
          </div>
        </div>

       

        <div className="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Título do modal</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar" >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" data-target={Modal2} data-toggle="modal"  onClick={limparSomar}>Fechar</button>
      </div>
    </div>
  </div>
</div>


<div class="modal fade modalClass" id="modal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Título do modal</h5>
          
          <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
            <span aria-hidden="true">&times;</span>
          </button>
        
      </div>
      <div class="modal-body">
        Cabouuuuu
      </div>
      <div class="modal-footer">
        <Link to='/tela3/'>
          <button type="button" class="btn btn-secondary">Fechar</button>
        </Link>  
      </div>
    </div>
  </div>
</div>

        
    </div>
  )
}
