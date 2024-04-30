import '../assets/css/AccionesCuenta.css'

import { Routes, Route } from 'react-router-dom'

import ConfiguracionCuenta from './ConfiguracionCuenta'
import RecuperarCuenta from './RecuperarCuenta'

function AccionesCuenta() {
  return (
    <div className="h-1dvh">
      <Routes>
        <Route 
          path='/acciones/*'
          element={
            <ConfiguracionCuenta />
          }
        />
        <Route 
          path='/recuperar-cuenta/*'
          element={
            <RecuperarCuenta />
          }
        />
      </Routes>
    </div>
  )
}

export default AccionesCuenta