
import { Link } from 'react-router-dom'
import Logo from '../assets/img/logo.webp'

function CorreoEnviado() {
  return (
    <>
      <div className="modal__por-defecto modal__contenido-3 modal__sombra">
        <div className='justify-center align-center gap-x__10 acciones-cuenta__contenedor'>
          <img className='acciones-cuenta__logo' src={Logo} alt="Logo del Centro de Idiomas" />
          <span className='acciones-cuenta__titulo'>Centro de Idiomas</span>
        </div>
        <h2 className="text-center">El mensaje ya ha sido enviado</h2>
        <p>Comprueba si has recibido el mensaje en tu correo electrónico.</p>
        <p>En dado caso que el mensaje no esté en <strong>Bandeja de entrada</strong>, revisa el apartado de <strong>Correo no deseado</strong>.</p>
        <div className='contenedor__centro-separacion'>
          <Link className='boton__blanco' to={'/sistema-asistencias'}>Ir al inicio</Link>
        </div>
      </div>
    </>
  )
}

export default CorreoEnviado