import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Tela1 } from '../tela1/Tela1'
import { Tela2 } from '../tela2/Tela2'
import { Tela3 } from '../tela3/Tela3'
import './styles.css'

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tela1/>}/>
        <Route path="/tela2/:id/:idpc/:partida" element={<Tela2/>}/>
        <Route path="/tela3/" element={<Tela3/>}/>
      </Routes>
    </Router>
  )
}

