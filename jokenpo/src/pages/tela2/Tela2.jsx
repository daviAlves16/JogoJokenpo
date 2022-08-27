import React, {useState, useEffect, useContext} from 'react'
import axios from "axios";
import {Link, useParams} from 'react-router-dom'
import { Card2 } from '../../components/Card2/Card2';
import { Movimento } from '../../components/Movimentos/Movimentos';
import { CustomerContext } from '../../components/Contexts/customer';
import './Tela2.css'
import pedra from '../../assets/pedra.png'
import papel from '../../assets/papel.png'
import tesoura from '../../assets/tesoura.png'
import empatou from '../../assets/empatou.png'
import perdeu from '../../assets/perdeu.png'
import ganhou from '../../assets/ganhou.png'
import interrogacao from '../../assets/interrogacao.png'


export function Tela2() {
  var {id, idpc, partida} = useParams();
  const {setPartidasOficiais} = useContext(CustomerContext)
  const {submit} = useContext(CustomerContext)
  const {infoPartida} = useContext(CustomerContext)
  const [numeroPartida, setNumeroPartida] = useState(infoPartida[infoPartida.length - 1].numeroPartida + 1);
  const [personagem, setPersonagem] = useState({id: 0, nome : '', img : ''});
  const [personagemPC, setPersonagemPC] = useState({id: 0, nome : '', img : ''});
  var cont = 0
  var ids = []
  var test = 0
  var moviments = [{tipo: 'Pedra', img: pedra}, {tipo: 'Papel', img: papel}, {tipo: 'Tesoura', img: tesoura}]
  var vencedor2 = ''

  const [MinhaJogada, setMinhaJogada] = useState({tipo: '', img: ''});
  const [ResultMinhaJogada, setResultMinhaJogada] = useState({tipo: '', img: ''});
  const [ResultPcJogada, setResultPcJogada] = useState({tipo: '', img: ''});
  const [ResultadoFinal, setResultadoFinal] = useState({tipo: '', img: interrogacao});
  const [ultimaJogadaPc, setUltimaJogadaPc] = useState(interrogacao);
  const [MeuEstadoPlacar, setMeuEstadoPlacar] = useState(0);
  const [MeuPcPlacar, setMeuPcPlacar] = useState(0);
  const [RodadasOficiais, setRodadasOficiais] = useState(['?']); 
  const [contadorRodadas, setContadorRodadas] = useState(0); 
  const [FimDeJogo1, setFimDeJogo1] = useState('removePlacares');
  const [FimDeJogo2, setFimDeJogo2] = useState('adicionarPlacares');
  const [vencedor, setVencedor] = useState('');
  const [tipoModal, setTipoModal] = useState({tipo: '', tipo2:'', classe: ''});
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
  setResultMinhaJogada({tipo: MinhaJogada.tipo, img: MinhaJogada.img})
  MinhaJogada2 = MinhaJogada.tipo

  var indice = Math.floor(Math.random() * moviments.length);
  setResultPcJogada({tipo: moviments[indice].tipo, img: moviments[indice].img})
  PcJogada2 = moviments[indice].tipo

 
  if(MinhaJogada2 == 'Pedra'){
     
    if(PcJogada2 == 'Pedra'){
      setResultadoFinal({tipo: '=', img: empatou})
      setTipoModal({tipo: 'Oxeeeeeeeeee????', tipo2: 'Empatou ========!', classe: 'modalEmpatou'})

    }else{
      if(PcJogada2 == 'Papel'){
        setResultadoFinal({tipo: 'X', img: perdeu})
        setMeuPcPlacar((MeuPcPlacar) => MeuPcPlacar + 1)
        setTipoModal({tipo: 'nãooooooooooooooo', tipo2: 'Perdeu S/2', classe: 'modalPerdeu'})
        
      }else{
        if(PcJogada2 == 'Tesoura'){
          setResultadoFinal({tipo: 'S2', img: ganhou})
          setMeuEstadoPlacar((MeuEstadoPlacar) => MeuEstadoPlacar + 1)
          setTipoModal({tipo: 'Aeeeeeeeeeeeeeee', tipo2: 'Ganhou !!!!!!', classe: 'modalGanhou'})
        }
      }
    }
  }else{
    if(MinhaJogada2 == 'Papel'){
      
      if(PcJogada2 == 'Pedra'){
        setResultadoFinal({tipo: 'S2', img: ganhou})
        setMeuEstadoPlacar((MeuEstadoPlacar) => MeuEstadoPlacar + 1)
        setTipoModal({tipo: 'Aeeeeeeeeeeeeeee', tipo2: 'Ganhou !!!!!!', classe: 'modalGanhou'})
        
      }else{
        if(PcJogada2 == 'Papel'){
          setResultadoFinal({tipo: '=', img: empatou})
          setTipoModal({tipo: 'Oxeeeeeeeeee????', tipo2: 'Empatou ========!', classe: 'modalEmpatou'})
        }else{
          if(PcJogada2 == 'Tesoura'){
            setResultadoFinal({tipo: 'X', img: perdeu})
            setMeuPcPlacar((MeuPcPlacar) => MeuPcPlacar + 1)
            setTipoModal({tipo: 'nãooooooooooooooo', tipo2: 'Perdeu S/2', classe: 'modalPerdeu'})
            
          }
        }
      }
    }else{
      if(MinhaJogada2 == 'Tesoura'){
        
        if(PcJogada2 == 'Pedra'){
          setResultadoFinal({tipo: 'X', img: perdeu})
          setMeuPcPlacar((MeuPcPlacar) => MeuPcPlacar + 1)
          setTipoModal({tipo: 'nãooooooooooooooo', tipo2: 'Perdeu S/2', classe: 'modalPerdeu'})
        }else{
          if(PcJogada2 == 'Papel'){
            setResultadoFinal({tipo: 'S2', img: ganhou})
            setMeuEstadoPlacar((MeuEstadoPlacar) => MeuEstadoPlacar + 1)
            setTipoModal({tipo: 'Aeeeeeeeeeeeeeee', tipo2: 'Ganhou !!!!!!', classe: 'modalGanhou'})
          }else{
            if(PcJogada2 == 'Tesoura'){
              setResultadoFinal({tipo: '=', img: empatou})
              setTipoModal({tipo: 'Oxeeeeeeeeee????', tipo2: 'Empatou ========!', classe: 'modalEmpatou'})
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
    tipoMinhaJogada: ResultMinhaJogada.tipo,
    tipoPcJogada: ResultPcJogada.tipo,
    urlMinhaJogada:ResultMinhaJogada.img,
    urlPcJogada: ResultPcJogada.img, 
    resultado: ResultadoFinal.tipo,
    resultadoImg: ResultadoFinal.img
  }

  setRodadasOficiais(prevState => [...prevState, Rodada])
  if(RodadasOficiais == '?'){
    RodadasOficiais.shift()
  }

    setResultMinhaJogada({tipo: '', img: ''})
    setResultPcJogada({tipo: '', img: ''})
    setResultadoFinal({tipo:'', img: interrogacao})
    setContadorRodadas((contadorRodadas) => contadorRodadas + 1)
    setUltimaJogadaPc(RodadasOficiais[RodadasOficiais.length - 1].urlPcJogada)

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

        <div className='divCards2'>
        <Card2 
          name={personagem.nome} 
          link={personagem.img}
        />
        
        <div className='divDoJogo'>
          <div className='placares'>
            <div className='divNomePlacar'>
              <h2>Partida: {numeroPartida}</h2>
              <h2>Rodada: {contadorRodadas}</h2>
            </div>

            <div className='placar2'>

              <div className='placar3Nomes'>
                <h3 style={{margin: '0px'}}>{personagem.nome}</h3>
              </div>
              
              <div className='placar3'>
              <h1>{MeuEstadoPlacar}</h1>
              <h1>X</h1>
              <h1>{MeuPcPlacar}</h1>
              </div>
              
              <div className='placar3Nomes'>
                <h3 style={{margin: '0px'}}>{personagemPC.nome}</h3>
              </div>
            </div>

            <div className={FimDeJogo1 + ' fimDeJogo'}>
              <h1>Partida Encerrada!</h1> 
              <h2>Vencedor : {vencedor}</h2>
              <Link to='/tela3/'>
                <button type="button" class="btn btn-info">Ver Resultados</button>
              </Link> 
            </div>
          </div>
          
          <div className={'movimentosDoJogos ' + FimDeJogo2}>
            <div className='jogadas'>
              <img src={ResultMinhaJogada.img} alt="" className='imgJogadas5'/>
            </div>
            <div className='jogadas'>
              <img src={ResultadoFinal.img} alt="" className='imgJogadas5'/>
            </div>
            <div className='jogadas'>
              <img src={ResultPcJogada.img} alt="" className='imgJogadas5'/>
              </div>
          </div>
          
        </div>

        <Card2 
          name={personagemPC.nome} 
          link={personagemPC.img}
        />
        </div>

        <div className={'divMovimentos ' + FimDeJogo2}>

          <div className='divMovimentosJogador'>
     
            <div className='divMovimentosJogador2'>
              <button type="button" value="Pedra" onClick={() => setMinhaJogada({tipo: 'Pedra', img: pedra})} className="movimentoItem">
                <img src={pedra} alt="" width='100%' height='100%'/>
              </button>
              <p>Pedra</p>
            </div>

            <div className='divMovimentosJogador2'>
              <button type="button" value="Papel" onClick={() => setMinhaJogada({tipo: 'Papel', img: papel})} className="movimentoItem">
                <img src={papel} alt="" width='100%' height='100%'/>
              </button>
              <p>Papel</p>
            </div>

            <div className='divMovimentosJogador2'>
              <button type="button" value="Tesoura" onClick={() => setMinhaJogada({tipo: 'Tesoura', img: tesoura})} className="movimentoItem">
                <img src={tesoura} alt="" width='100%' height='100%'/>
              </button>
              <p>Tesoura</p>
            </div>
         
          </div>

          <div className='divBotaoJogar'>
            <button type="button" class="btn btn-success botaoJogar" onClick={jogar} data-toggle="modal" data-target="#modalExemplo">
              Jogar
            </button>
          </div>

          <div className='divMovimentoPc'>
            <div>
              <img src={RodadasOficiais[RodadasOficiais.length - 1].urlPcJogada} alt="" className="movimentoItem"/>
            </div>
          </div>
        </div>

       

        <div className="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{tipoModal.tipo}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar" >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className={'modal-body '+ tipoModal.classe}>
      {tipoModal.tipo2}
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
