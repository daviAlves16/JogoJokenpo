import React, {useContext} from 'react';
import './Resultados.css'
import { Rodadas } from '../Rodadas/Rodadas';
import { CustomerContext } from '../../components/Contexts/customer';

export function Resultados(props) {
    const {PartidasOficiais} = useContext(CustomerContext)
    const {infoPartida} = useContext(CustomerContext)
  return (
    <div className='resultadosBase'>
        <div className='headerResult'>
            <h2>Partida: {PartidasOficiais[props.indicePartida][0].numeroPartida}</h2>
            <h2>
                {PartidasOficiais[props.indicePartida][0].nomeMeuJogador}
                  - x - 
                {PartidasOficiais[props.indicePartida][0].nomePcJogador}
            </h2>
            <h2>Vencedor: {infoPartida[props.indicePartida].vencedor}</h2>
            
        </div>
        <div>
        {
          PartidasOficiais[props.indicePartida].map(rodada =>(
            <Rodadas
                key={rodada.idRodada}
                imgMeuJogador={rodada.imagemMeuJogador}
                imgPcJogador={rodada.imagemPcJogador}
                minhaJogada={rodada.tipoMinhaJogada}
                pcJogada={rodada.tipoPcJogada}
                result={rodada.resultado}

            />
          ))
          
        }
            
        </div>
        <div>
            <h2>placar : 
                {infoPartida[props.indicePartida].meuPlacar}
                x
                {infoPartida[props.indicePartida].pcPlacar}
                </h2>
        </div>
    </div>
  );
}