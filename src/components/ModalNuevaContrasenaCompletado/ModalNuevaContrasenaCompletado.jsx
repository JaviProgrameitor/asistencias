
import Logo from '../../assets/img/logo.webp'

import { Link } from 'react-router-dom'

function ModalNuevaContrasenaCompletado() {
  return (
    <div className="modal__por-defecto modal__contenido-3 modal__sombra">
      <div className='justify-center align-center gap-x__10 acciones-cuenta__contenedor'>
        <img className='acciones-cuenta__logo' src={Logo} alt="Logo del Centro de Idiomas" />
        <span className='acciones-cuenta__titulo'>Centro de Idiomas</span>
      </div>
      <h2 className='text-center'>Se actualizó la contraseña correctamente.</h2>
      <div className='justify-center'>
        <Link className='boton__verde-oscuro' to={'/sistema-asistencias'}>Ir al Inicio</Link>
      </div>
    </div>
  )
}

export default ModalNuevaContrasenaCompletado