import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Tela1 } from '../tela1/Tela1'
import { Tela2 } from '../tela2/Tela2'
import './styles.css'

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tela1/>}/>
        <Route path="/tela2" element={<Tela2/>}/>
      </Routes>
    </Router>
  )
}

