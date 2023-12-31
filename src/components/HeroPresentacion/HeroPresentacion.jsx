import '../../assets/css/components/HeroPresentacion.css'

import { BsTelephoneFill } from 'react-icons/bs'
import { FcOk } from 'react-icons/fc'
import { FaLanguage } from 'react-icons/fa'

import ImagenMancha from '../../assets/img/mancha.png'

function HeroPresentacion() {
  return (
    <div className='caja-presentacion'>
      <div 
        className='caja-presentacion__parte-1' 
        data-aos="fade-right"
        data-aos-duration="1500"
      >
        <div className='numero-telefono'>
          <BsTelephoneFill />
          <span>+527681017928</span>
        </div>
        <div className='promocional__modalidades'>
          <span>Presencial y Online</span>
        </div>
        <h1 className='promocional__titulo'>
          Te enseñamos
          <br id='salto_1' />
          <strong> IDIOMAS </strong>
          de una 
          <br id='salto_2' />
          <span> manera fácil</span>
        </h1>
        <p className='promocional__subtitulo'>
          Te proporcionaremos una formación lingüistica completa y eficaz, 
          impulsandote a desarrollar competencia plena en la lengua meta de tu elección.
        </p>
        <div className='promocional__idiomas'>
          <div className='prom__idioma'>
            <FcOk />
            Inglés
          </div>
          <div className='prom__idioma'>
            <FcOk />
            Francés
          </div>
          <div className='prom__idioma'>
            <FcOk />
            Español
          </div>
          <div className='prom__idioma'>
            <FcOk />
            Alemán
          </div>
        </div>
        <div className='promocional__botones'>
          <a 
            className='boton-presentacion boton__blanco contenedor__centrado-vertical' 
            href='#nuestros-servicios'
          >
            <FaLanguage className='icon-servicios'/>
            Ver Servicios
          </a>
          <a 
            className='boton-presentacion boton__verde-oscuro contenedor__centrado-vertical' 
            href="https://api.whatsapp.com/send?phone=+527681017928&text=Informaci%C3%B3n"
          >
            <i className="fa fa-whatsapp whatsapp-icon"></i>
            Más Información
          </a>
        </div>
      </div>
      <div 
        className='caja-presentacion__parte-2 contenedor__ambos-lados_centrado' 
        data-aos="fade-left"
        data-aos-duration="1500"
      >
        <img className='promocional__imagen' src={ImagenMancha} />
      </div>
    </div>
  )
}

export default HeroPresentacion