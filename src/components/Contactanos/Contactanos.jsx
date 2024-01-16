import '../../assets/css/components/Contactanos.css'

import ImagenWhatsapp from '../../assets/img/whatsapp.webp'
import ImagenCorreo from '../../assets/img/gmail.webp'
import ImagenLinkedin from '../../assets/img/linkedin.webp'
import ImagenFacebook from '../../assets/img/facebook.webp'
import ImagenInstagram from '../../assets/img/instagram.webp'
import ImagenTiktok from '../../assets/img/tik-tok.webp'
import ImagenContactanos from '../../assets/img/contactanos.webp'

function Contactanos() {
  return (
    <div className='caja-contacto cajas__promocionales'>
      <div className='contenedor__centrado-separacion'>
        <h3 id='contacto' className='titulos__promocionales'>Contáctanos</h3>
      </div>
      <div className="caja-contacto__contenido">
        <div className='caja-contacto__contenido-enlaces'>
          <a 
            className='enlaces-contacto' 
            target="_blank"
            href="https://wa.me/message/22D2YLDSWOARF1?fbclid=IwAR1PShHXFVNqj_7P2yhhxVwkJsoiGZ7E_cdp9dMPHhShaKRwNUc4v98kXQM"
          >
            <img className='enlaces-contacto__imagen' src={ImagenWhatsapp} alt="Icono de Whatsapp" />
            <div data-text="Awesome" className="enlaces-contacto__texto">
              <span className="actual-text">&nbsp;+527681017928&nbsp;</span>
              <span className="hover-text" aria-hidden="true">&nbsp;+527681017928&nbsp;</span>
            </div>
          </a>
          <a 
            className='enlaces-contacto'
            target='_blank'
            href='https://www.facebook.com/cidiomasmex'
          >
            <img className='enlaces-contacto__imagen' src={ImagenFacebook} alt="Icono de Facebook" />
            <div data-text="Awesome" className="enlaces-contacto__texto">
              <span className="actual-text">&nbsp;/cidiomasmex&nbsp;</span>
              <span className="hover-text" aria-hidden="true">&nbsp;/cidiomasmex&nbsp;</span>
            </div>
          </a>
          <a 
            className='enlaces-contacto'
            target='_blank'
            href='https://www.instagram.com/cidiomasmex/'
          >
            <img className='enlaces-contacto__imagen' src={ImagenInstagram} alt="Icono de Instagram" />
            <div data-text="Awesome" className="enlaces-contacto__texto">
              <span className="actual-text">&nbsp;/cidiomasmex&nbsp;</span>
              <span className="hover-text" aria-hidden="true">&nbsp;/cidiomasmex&nbsp;</span>
            </div>
          </a>
          <a 
            className='enlaces-contacto'
            target='_blank'
            href='https://www.tiktok.com/@centrodeidiomas_?_t=8ik0ks73CVx&_r=1'
          >
            <img className='enlaces-contacto__imagen' src={ImagenTiktok} alt="Icono de Tik tok" />
            <div data-text="Awesome" className="enlaces-contacto__texto">
              <span className="actual-text">&nbsp;/centrodeidiomas_&nbsp;</span>
              <span className="hover-text" aria-hidden="true">&nbsp;/centrodeidiomas_&nbsp;</span>
            </div>
          </a>
          <a 
            className='enlaces-contacto'
            target='_blank'
            href='https://www.linkedin.com/company/cinvmex/'
          >
            <img className='enlaces-contacto__imagen' src={ImagenLinkedin} alt="Icono de Linkedin" />
            <div data-text="Awesome" className="enlaces-contacto__texto">
              <span className="actual-text">&nbsp;/company/cinvmex/&nbsp;</span>
              <span className="hover-text" aria-hidden="true">&nbsp;/company/cinvmex/&nbsp;</span>
            </div>
          </a>
          <a className='enlaces-contacto'>
            <img className='enlaces-contacto__imagen' src={ImagenCorreo} alt="Icono de Correo" />
            <div data-text="Awesome" className="enlaces-contacto__texto">
              <span className="actual-text">&nbsp;atusordenes@centroidiomas.net&nbsp;</span>
              <span className="hover-text" aria-hidden="true">&nbsp;atusordenes@centroidiomas.net&nbsp;</span>
            </div>
          </a>
        </div>
        <div className='caja-contacto__demostracion'>
          <img src={ImagenContactanos} alt="Imagen representando la atención al cliente del Centro de Idiomas" />
        </div>
      </div>
    </div>
  )
}

export default Contactanos