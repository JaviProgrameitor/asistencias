import '../assets/css/Home.css'

import { useEffect, useState } from 'react'

import logo from '../assets/img/logo.webp'

import SideBar from '../components/SideBar/SideBar'
import BarraNavegacionPromocional from '../components/BarraNavegacionPromocional/BarraNavegacionPromocional'
import HeroPresentacion from '../components/HeroPresentacion/HeroPresentacion'
import RazonesEstudio from '../components/RazonesEstudio/RazonesEstudio'
import Servicios from '../components/Servicios/Servicios'
import Modalidades from '../components/Modalidades/Modalidades'
import Modulos from '../components/Modulos/Modulos'
import Metodologia from '../components/Metodologia/Metodologia'
import Contactanos from '../components/Contactanos/Contactanos'

import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  const  [ sideBar, setSideBar ] = useState(false)

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className='promocional'>

      {/* Navbar */}
      <BarraNavegacionPromocional
        open={sideBar}
        setOpen={setSideBar}
      />

      {/* SideBar */}
      <SideBar
        estado={sideBar}
        cambiarEstado={setSideBar}
      />

      <main className='contenedor-promocional__contenido'>

        {/* Presentación */}
        <HeroPresentacion />

        {/* Quiénes Somos */}

        {/* <div className='caja-quienes-somos cajas__promocionales'>
          <div className='quienes-somos__imagen'></div>
          <div className='quienes-somos__informacion'>
            <div className='contenedor__centrado-separacion'>
              <h3 id='quienes-somos' className='titulos__promocionales'>¿Quiénes Somos?</h3>
            </div>
            <p className='quienes-somos__texto'>
              Consequat non voluptate consequat adipisicing ex elit adipisicing reprehenderit culpa dolore dolore. 
              Sunt sit in ut cupidatat ut irure laborum do minim duis. Laboris ut sit labore adipisicing id in amet commodo. 
              Culpa ad ad ullamco officia aliquip aliquip dolore fugiat duis velit mollit Lorem laborum. 
              Magna quis velit adipisicing sint reprehenderit dolore voluptate elit quis irure.
            </p>
          </div>
        </div> */}

        {/* Por qué estudiar en el Centro de Idiomas */}
        <RazonesEstudio />

        {/* Nuestros Servicios */}
        <Servicios />

        {/* Modalidades */}
        <Modalidades />

        {/* Modulos */}
        <Modulos />

        {/* Metodología */}
        <Metodologia />

        {/* Contactanos */}
        <Contactanos />

      </main>

      {/* Footer */}
      <footer className='contenedor-footer cajas__promocionales'>
        <picture className='contenedor-footer__informacion'>
          <img src={logo} alt="Logo del Centro de Idiomas" />
          <h3>Centro de Idiomas</h3>
        </picture>
        <p className='contenedor-footer__derechos-autor'>Todos los derechos reservados.</p>
      </footer>

      {/* Boton flotante Whatsapp */}
      <div className='boton__whatsapp'>
        <a
          className="whatsapp" 
          target="_blank"
          href="https://wa.me/message/22D2YLDSWOARF1?fbclid=IwAR1PShHXFVNqj_7P2yhhxVwkJsoiGZ7E_cdp9dMPHhShaKRwNUc4v98kXQM"
        > 
          <i className="fa fa-whatsapp whatsapp-icon"></i>
        </a>
        <div className='whatsapp whatsapp__onda'>

        </div>
      </div>

    </div>
  )
}

export default Home