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
        <div className='headerDoHeader'>
          <div className='divHeaderDosHeader'>
            <h4 className='fonts3'>Partida</h4>
          </div>
          <div className='divHeaderDosHeader'>
            <h4 className='fonts3'>Adversarios</h4>
          </div>
          <div className='divHeaderDosHeader'>
            <h4 className='fonts3'>Vencedor</h4>
          </div>
        </div>
            
        <div className='corpoHeader'>
          <div className='div1Header'>
            <div><h3>{PartidasOficiais[props.indicePartida][0].numeroPartida}</h3></div>
          </div>
            
          <div className='div2Header'>
            <div className='div2Header2'>
              <div style={{width: '45%'}}><h4>{PartidasOficiais[props.indicePartida][0].nomeMeuJogador}</h4></div>
              <div style={{width: '10%'}}><h1 className='fonts3'>X</h1></div>
              <div style={{width: '45%'}}><h4>{PartidasOficiais[props.indicePartida][0].nomePcJogador}</h4></div>
            </div>
          </div>

          <div className='div3Header'>
            <div> <h3>{infoPartida[props.indicePartida].vencedor}</h3></div>
          </div>
        </div>
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
                imgResultado={rodada.resultadoImg}
                urlMinhaJogada={rodada.urlMinhaJogada}
                urlPcJogada={rodada.urlPcJogada}
            />
          ))
        }
            
      </div>
      <div className='footerHeader'>
        <div className='footerHeader2'>
          <div>
            <h2 className='fonts3'>Placar: </h2>
          </div>
          <div className='footerHeader2Placar'>
            <h2>{infoPartida[props.indicePartida].meuPlacar}</h2>
            <h2 className='fonts3'>X</h2>
            <h2>{infoPartida[props.indicePartida].pcPlacar}</h2>
          </div>
        </div>    
      </div>
    </div>
  );
}