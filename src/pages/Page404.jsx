import '../assets/css/Page404.css'
import Logo from '../assets/img/logo.webp'

import { Link } from 'react-router-dom'

function Page404() {
  return (
    <section className="page_404">
      <div className='page_404-contenedor'>
        4
        <img className='page_404-logo' src={Logo} alt="Logo del Centro de Idiomas" />
        4
      </div>
      <div className="contant_box_404">
        <h3>¡OOPS!</h3>
        
        <p className='padd-x__20'>Esta página no existe o no has iniciado sesión todavía!</p>
        
        <Link className="boton__verde-oscuro" to={'/sistema-asistencias'}>Ir a Página Principal</Link>
      </div>
    </section>
  )
}

export default Page404