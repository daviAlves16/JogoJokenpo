import React, {useState, useEffect, useContext} from 'react'
import axios from "axios";
import {Link, useParams} from 'react-router-dom'
import { Card2 } from '../../components/Card2/Card2';
import { Movimento } from '../../components/Movimentos/Movimentos';
import { CustomerContext } from '../../components/Contexts/customer';
import './Tela2.css'


export function Tela2() {
  var {id, idpc, partida} = useParams();
  const {setPartidasOficiais} = useContext(CustomerContext)
  const {submit} = useContext(CustomerContext)
  const {infoPartida} = useContext(CustomerContext)
  const [numeroPartida, setNumeroPartida] = useState(partida)
  const [personagem, setPersonagem] = useState({id: 0, nome : '', img : ''});
  const [personagemPC, setPersonagemPC] = useState({id: 0, nome : '', img : ''});
  var cont = 0
  var ids = []
  var test = 0
  var moviments = ['Pedra', 'Papel', 'Tesoura']
  var vencedor2 = ''

  const [MinhaJogada, setMinhaJogada] = useState('');
  const [ResultMinhaJogada, setResultMinhaJogada] = useState('');
  const [ResultPcJogada, setResultPcJogada] = useState('');
  const [ResultadoFinal, setResultadoFinal] = useState('');
  const [MeuEstadoPlacar, setMeuEstadoPlacar] = useState(0);
  const [MeuPcPlacar, setMeuPcPlacar] = useState(0);
  const [RodadasOficiais, setRodadasOficiais] = useState(['?']); 
  const [contadorRodadas, setContadorRodadas] = useState(0); 
  const [FimDeJogo1, setFimDeJogo1] = useState('removePlacares');
  const [FimDeJogo2, setFimDeJogo2] = useState('adicionarPlacares');
  const [vencedor, setVencedor] = useState('');
  //var RodadasOficiais = []
  //var FimDeJogo1 = 'flex'
  //var FimDeJogo2 = 'none'
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

  function fim(){
    
    setFimDeJogo1('adicionarPlacares')
    setFimDeJogo2('removePlacares')
    setPartidasOficiais(prevState => [...prevState, RodadasOficiais]);
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
  
 }

 function limparSomar(){

  const Rodada = {
    idRodada: contadorRodadas,
    numeroPartida: infoPartida[infoPartida.length - 1].numeroPartida + 1,
    nomeMeuJogador: personagem.nome,
    nomePcJogador: personagemPC.nome,
    imagemMeuJogador: personagem.img,
    imagemPcJogador: personagemPC.img,
    tipoMinhaJogada: ResultMinhaJogada,
    tipoPcJogada: ResultPcJogada,
    resultado: ResultadoFinal,
  }

  setRodadasOficiais(prevState => [...prevState, Rodada])
  if(RodadasOficiais == '?'){
    RodadasOficiais.shift()
  }

    setResultMinhaJogada('')
    setResultPcJogada('')
    setResultadoFinal('')
    setContadorRodadas((contadorRodadas) => contadorRodadas + 1)

    if((MeuEstadoPlacar) >= 3){
      fim()
      setVencedor(personagem.nome)
      submit({numeroPartida: infoPartida[infoPartida.length - 1].numeroPartida + 1, vencedor : personagem.nome, meuPlacar: MeuEstadoPlacar, pcPlacar: MeuPcPlacar})
    }else{
      if((MeuPcPlacar) >= 3){
        fim()
        setVencedor(personagemPC.nome)
        submit({numeroPartida: infoPartida[infoPartida.length - 1].numeroPartida + 1, vencedor : personagemPC.nome, meuPlacar: MeuEstadoPlacar, pcPlacar: MeuPcPlacar})
      }
    }
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
       <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <h1>Partida: {infoPartida[infoPartida.length - 1].numeroPartida + 1}</h1>
        <h1>Rodada: {contadorRodadas}</h1>
       </div>
       
        

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

            <div className={FimDeJogo1 + ' fimDeJogo'}>
              <h1>Partida Encerrada!</h1> 
              <h1>Vencedor : {vencedor}</h1>
              <Link to='/tela3/'>
              <input type="button" value="Ver Resultados" />
              </Link> 
            </div>

          </div>
          
          <div className={'movimentosDoJogos ' + FimDeJogo2}>
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
        <button type="button" class="btn btn-secondary" data-dismiss="modal"  data-toggle="modal"  onClick={limparSomar}>Fechar</button>
      </div>
    </div>
  </div>
</div>

        
    </div>
  )
}
