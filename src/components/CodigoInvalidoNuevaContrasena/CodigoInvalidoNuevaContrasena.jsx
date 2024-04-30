
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo.webp'

function CodigoInvalidoNuevaContrasena() {
  return (
    <div className="h-1dvh">
      <div className="modal__por-defecto modal__contenido-3 modal__sombra">
        <div className='justify-center align-center gap-x__10 acciones-cuenta__contenedor'>
          <img className='acciones-cuenta__logo' src={Logo} alt="Logo del Centro de Idiomas" />
          <span className='acciones-cuenta__titulo'>Centro de Idiomas</span>
        </div>
        <h2 className='text-center'>Error al intentar cambiar la contraseña</h2>
        <p>La petición para cambiar la contraseña ha caducado o ya se ha usado el enlace.</p>
        <p>Intentalo de nuevo.</p>
        <div className="justify-center">
          <Link className='boton__verde-oscuro' to={'/sistema-asistencias'}>Ir al inicio</Link>
        </div>
      </div>
    </div>
  )
}

export default CodigoInvalidoNuevaContrasena