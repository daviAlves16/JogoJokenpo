import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './pages/App/App'
import { Tela1 } from './pages/tela1/Tela1'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Tela1 />
  </React.StrictMode>
)
