
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import Logo from '../assets/img/logo.webp'

import { resetPassword } from '../firebase'

import Page404 from '../pages/Page404'

function SolicitarEmailContrasena({datosUsuario, setDatosUsuario}) {
  const [ enviando, setEnviando ] = useState(false)

  const navigate = useNavigate()

  function enviarDatos() {
    setEnviando(true)
    resetPassword(datosUsuario.email)
    .then(() => setDatosUsuario(null))
    .then(() => setEnviando(false))
    .then(() => {
      setTimeout(() => {
        navigate('/sistema-asistencias/cuenta/recuperar-cuenta/correo-enviado')
      }, 1000);
    })
    .catch((error) => console.log(error))
  }
  return (
    <>
      {
        datosUsuario != null
          ? <div className="modal__por-defecto modal__contenido-3 modal__sombra">
              <div className='justify-center align-center gap-x__10 acciones-cuenta__contenedor'>
                <img className='acciones-cuenta__logo' src={Logo} alt="Logo del Centro de Idiomas" />
                <span className='acciones-cuenta__titulo'>Centro de Idiomas</span>
              </div>
              <h2 className="text-center">Te enviaremos un mensaje a tu correo electrónico</h2>
              <div className='justify-center align-center direction-column gap-y__10 padd-b__10'>
                <img className='acciones-cuenta__solicitar-foto' src={datosUsuario.photoURL} alt="Foto de perfil del usuario" />
                <span>{datosUsuario.displayName}</span>
              </div>
              <div className='contenedor__centro-separacion'>
                <Link className='boton__blanco' to={'/sistema-asistencias'} aria-disabled={enviando}>Cancelar</Link>
                <button 
                  className='boton__verde-oscuro' 
                  onClick={enviarDatos}
                >
                  {
                    !enviando 
                      ? 'Continuar'
                      :
                        <>
                          Enviando
                          <span className="element-loader"></span>
                        </>
                  }
                </button>
              </div>
            </div>
          : <Page404 />
      }
    </>
  )
}

export default SolicitarEmailContrasena