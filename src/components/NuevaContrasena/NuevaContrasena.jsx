
import { useEffect, useState } from 'react'
import { Navigate } from "react-router-dom";

import { verificarCodeContrasena } from '../../firebase'

import ModalNuevaContrasena from '../ModalNuevaContrasena/ModalNuevaContrasena'

function NuevaContrasena({actionCode}) {

  const [ codeValid, setCodeValid ] = useState(null)
  const [ emailUser, setEmailUser ] = useState('')

  function elementosVerificacion() {
    verificarCodeContrasena(actionCode)
    .then((email) => {
      console.log('hola')
      setEmailUser(email)
      setCodeValid(true)
    })
    .catch(error => {
      console.log(error)
      if(error.message == 'Firebase: Error (auth/invalid-action-code).') setCodeValid(false)
    })
  }

  useEffect(() => elementosVerificacion(), [])

  return (
    <>
      {
        codeValid && (
          <ModalNuevaContrasena
            actionCode={actionCode}
            emailUser={emailUser}
          />
        )
      }
      {
        codeValid === false && (
          <Navigate to="/sistema-asistencias/cuenta/recuperar-cuenta/código-no-valido" />
        )
      }
    </>
  )
}

export default NuevaContrasena