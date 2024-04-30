
import { Routes, Route } from 'react-router-dom'

import RecuperarCuentaPrincipal from './RecuperarCuentaPrincipal'
import SolicitarEmailContrasena from './SolicitarEmailContrasena'
import CodigoInvalidoNuevaContrasena from '../components/CodigoInvalidoNuevaContrasena/CodigoInvalidoNuevaContrasena'
import ModalNuevaContrasenaCompletado from '../components/ModalNuevaContrasenaCompletado/ModalNuevaContrasenaCompletado'
import CorreoEnviado from './CorreoEnviado'

import { useState } from 'react'

function RecuperarCuenta() {
  const [ datosUsuario, setDatosUsuario ] = useState(null)

  return (
    <Routes>
      <Route 
        path='/'
        element={
          <RecuperarCuentaPrincipal
            setDatosUsuario={setDatosUsuario}
          />
        }
      />
      <Route 
        path='/solicitar-correo'
        element={
          <SolicitarEmailContrasena
            datosUsuario={datosUsuario}
            setDatosUsuario={setDatosUsuario}
          />
        }
      />
      <Route 
          path='/correo-enviado'
          element={
            <CorreoEnviado />
          }
        />
      <Route 
          path='/código-no-valido'
          element={
            <CodigoInvalidoNuevaContrasena />
          }
        />
        <Route 
          path='/completado'
          element={
            <ModalNuevaContrasenaCompletado />
          }
        />
    </Routes>
  )
}

export default RecuperarCuenta