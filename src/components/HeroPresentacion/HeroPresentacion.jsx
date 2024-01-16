import '../../assets/css/components/HeroPresentacion.css'

import { BsTelephoneFill } from 'react-icons/bs'
import { FcOk } from 'react-icons/fc'
import { FaLanguage } from 'react-icons/fa'

import ImagenMancha from '../../assets/img/mancha.webp'
import ImagenWhatsapp from '../../assets/img/whatsapp.webp'
import ImagenCorreo from '../../assets/img/gmail.webp'
import ImagenLinkedin from '../../assets/img/linkedin.webp'
import ImagenFacebook from '../../assets/img/facebook.webp'
import ImagenInstagram from '../../assets/img/instagram.webp'
import ImagenTiktok from '../../assets/img/tik-tok.webp'

function HeroPresentacion() {
  return (
    <div className='caja-presentacion'>
      <div 
        className='caja-presentacion__parte-1' 
        data-aos="fade-right"
        data-aos-duration="1500"
      >
        <a 
          className='numero-telefono'
          href='tel:+527681017928' 
          target='_blank'
        >
          <BsTelephoneFill />
          <span>+527681017928</span>
        </a>
        <div className='promocional__modalidades'>
          <span>Presencial y En Línea</span>
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
          <div className='caja__prom__idioma'>
            <div className='prom__idioma'>
              <FcOk />
              Inglés
            </div>
            <div className='prom__idioma'>
              <FcOk />
              Francés
            </div>
          </div>
          <div className='caja__prom__idioma'>
            <div className='prom__idioma'>
              <FcOk />
              Español
            </div>
            <div className='prom__idioma'>
              <FcOk />
              Alemán
            </div>
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
            href="https://wa.me/message/22D2YLDSWOARF1?fbclid=IwAR1PShHXFVNqj_7P2yhhxVwkJsoiGZ7E_cdp9dMPHhShaKRwNUc4v98kXQM"
            target='_blank'
          >
            <i className="fa fa-whatsapp whatsapp-icon"></i>
            Más Información
          </a>
        </div>
        <div className='promocional__links'>
          <a
            className='prom__link'
            target="_blank"
            href="https://wa.me/message/22D2YLDSWOARF1?fbclid=IwAR1PShHXFVNqj_7P2yhhxVwkJsoiGZ7E_cdp9dMPHhShaKRwNUc4v98kXQM"
          >
            <img src={ImagenWhatsapp} alt="Icono de Whatsapp" />
          </a>
          <a
            className='prom__link'
            target='_blank'
            href='https://www.facebook.com/cidiomasmex'
          >
            <img src={ImagenFacebook} alt="Icono de Facebook" />
          </a>
          <a
            className='prom__link'
            target='_blank'
            href='https://www.instagram.com/cidiomasmex/'
          >
            <img src={ImagenInstagram} alt="Icono de Instagram" />
          </a>
          <a
            className='prom__link'
            target='_blank'
            href='https://www.tiktok.com/@centrodeidiomas_?_t=8ik0ks73CVx&_r=1'
          >
            <img src={ImagenTiktok} alt="Icono de Tik tok" />
          </a>
          <a
            className='prom__link'
            target='_blank'
            href='https://www.linkedin.com/company/cinvmex/'
          >
            <img src={ImagenLinkedin} alt="Icono de Linkedin" />
          </a>
          <a
            className='prom__link'
          >
            <img src={ImagenCorreo} alt="Icono de Correo" />
          </a>
        </div>
      </div>
      <div 
        className='caja-presentacion__parte-2 contenedor__ambos-lados_centrado' 
        data-aos="fade-left"
        data-aos-duration="1500"
      >
        <img className='promocional__imagen' src={ImagenMancha} alt='Imagen representativa al Centro de Idiomas' />
      </div>
    </div>
  )
}

export default HeroPresentacion