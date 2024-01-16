import '../../assets/css/components/BarraNavegacionPromocional.css'

import logo from '../../assets/img/logo.webp'

import { Link } from 'react-router-dom'

import Hamburger from 'hamburger-react'

function BarraNavegacionPromocional({open, setOpen}) {
  return (
    <nav className='navbar'>
      <picture id='inicio' className='contenedor-logo contenedor__todo-principio-centrado'>
        <img className='contendor-logo__logo' src={logo} alt="Logo del Centro de Idiomas" />
        <h3 className='contenedor-logo__nombre'>Centro de Idiomas</h3>
      </picture>
      <ul className='navbar__enlaces contenedor__todo-principio contenedor__gap-15'>
        {/* <li><a href='#inicio'>Inicio</a></li>
        <li><a href={'#quienes-somos'}>Quiénes Somos</a></li>
        <li><a href='#nuestros-servicios'>Servicios</a></li>
        <li><a href='#contacto'>Contáctanos</a></li> */}
        <li><Link to={'./sistema-asistencias'} >Sistema</Link></li>
      </ul>
      <Hamburger 
        className='hola' 
        toggled={open} 
        toggle={setOpen}
      />
    </nav>
  )
}

export default BarraNavegacionPromocional