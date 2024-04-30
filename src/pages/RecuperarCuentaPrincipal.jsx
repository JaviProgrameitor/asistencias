
import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import Logo from '../assets/img/logo.webp'

import CampoEmail from '../components/CampoEmail/CampoEmail'

import { getUserByEmail, usuariosGeneralURL } from '../services/service-db'

function RecuperarCuentaPrincipal({setDatosUsuario}) {
  const [ busquedaIniciada, setBusquedaIniciada ] = useState(false)
  const [ correo, setCorreo ] = useState('')
  const [ noEncontrado, setNoEncontrado ] = useState(false)

  const navigate = useNavigate()

  function enviarDatos(e) {
    e.preventDefault()

    setBusquedaIniciada(true)
    
    getUserByEmail(usuariosGeneralURL, correo)
    .then((res) => setDatosUsuario(res))
    .then(() => setBusquedaIniciada(false))
    .then(() => {
      setTimeout(() => {
        navigate('/sistema-asistencias/cuenta/recuperar-cuenta/solicitar-correo')
      }, 1000);
    })
    .catch((error) => {
      setBusquedaIniciada(false)
      if(error.message == 'auth/user-not-found') setNoEncontrado(true)
    })
  }

  return (
    <div className="modal__por-defecto modal__contenido-3 modal__sombra">
      <div className='justify-center align-center gap-x__10 acciones-cuenta__contenedor'>
        <img className='acciones-cuenta__logo' src={Logo} alt="Logo del Centro de Idiomas" />
        <span className='acciones-cuenta__titulo'>Centro de Idiomas</span>
      </div>
      <h2 className="text-center">Introduce tu correo electrónico para buscar tu cuenta.</h2>
      <form onSubmit={enviarDatos}>
        <CampoEmail 
          className='campo-verde-claro'
          valor={correo}
          cambiarValor={setCorreo}
          placeholder='Ingresa tu correo electrónico'
        />
        {
          noEncontrado && (
            <p className='text-red'>Lo siento, no hemos encontrado una cuenta asociada a ese correo electrónico.</p>
          )
        }
        <div className='justify-evenly'>
          <Link className='boton__blanco' to={'/sistema-asistencias'} aria-disabled={busquedaIniciada}>Cancelar</Link>
          <button className="boton__verde-oscuro">
            {
              !busquedaIniciada
                ? 'Buscar'
                : 
                  <>
                    Buscando
                    <span className='element-loader'></span>
                  </>
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default RecuperarCuentaPrincipal