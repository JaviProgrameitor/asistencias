import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import Logo from '../../assets/img/logo.webp'

import { confirmarContrasena } from '../../firebase'

import CampoContrasena from '../CampoContrasena/CampoContrasena'

function ModalNuevaContrasena({actionCode, emailUser}) {
  const [ newPassword, setNewPassword ] = useState('')
  const [ procesoIniciado, setProcesoIniciado ] = useState(false)

  const navigate = useNavigate()

  function enviarContrasena(e) {
    e.preventDefault()
    setProcesoIniciado(true)
  
    confirmarContrasena(actionCode, newPassword)
    .then(() => setProcesoIniciado(false))
    .then(() => setNewPassword(''))
    .then(() => {
      setTimeout(() => {
        navigate('/sistema-asistencias/cuenta/recuperar-cuenta/completado')
      }, 1000);
    })
    .catch(error => {
      setProcesoIniciado(false)
      if(error.message == 'Firebase: Error (auth/invalid-action-code).') {
        navigate('/sistema-asistencias/cuenta/recuperar-cuenta/código-no-valido')
      }
    })
  }

  return (
    <div className="modal__por-defecto modal__contenido-3 modal__sombra">
      <div className='justify-center align-center gap-x__10 acciones-cuenta__contenedor'>
        <img className='acciones-cuenta__logo' src={Logo} alt="Logo del Centro de Idiomas" />
        <span className='acciones-cuenta__titulo'>Centro de Idiomas</span>
      </div>
      <h2 className="text-center">Nueva contraseña para {emailUser}</h2>
      <form onSubmit={enviarContrasena}>
        <CampoContrasena
          valor={newPassword}
          cambiarValor={setNewPassword}
          className='campo-verde-claro'
        />
        <div className="justify-evenly">
          <Link className="boton__blanco" to={'/sistema-asistencias'} aria-disabled={procesoIniciado}>Cancelar</Link>
          <button className="boton__verde-oscuro">
            {
              !procesoIniciado
                ? 'Continuar'
                : 
                  <>
                    Procesando
                    <span className="element-loader"></span>
                  </>
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default ModalNuevaContrasena