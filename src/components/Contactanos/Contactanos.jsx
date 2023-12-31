import '../../assets/css/components/Contactanos.css'

import ImagenWhatsapp from '../../assets/img/whatsapp.png'
import ImagenCorreo from '../../assets/img/gmail.png'
import ImagenLinkedin from '../../assets/img/linkedin.png'
import ImagenFacebook from '../../assets/img/facebook.png'
import ImagenInstagram from '../../assets/img/instagram.png'
import ImagenTiktok from '../../assets/img/tik-tok.png'
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
            href="https://api.whatsapp.com/send?phone=+527681017928&text=Informaci%C3%B3n"
          >
            <img className='enlaces-contacto__imagen' src={ImagenWhatsapp} alt="" />
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
            <img className='enlaces-contacto__imagen' src={ImagenFacebook} alt="" />
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
            <img className='enlaces-contacto__imagen' src={ImagenInstagram} alt="" />
            <div data-text="Awesome" className="enlaces-contacto__texto">
              <span className="actual-text">&nbsp;/cidiomasmex&nbsp;</span>
              <span className="hover-text" aria-hidden="true">&nbsp;/cidiomasmex&nbsp;</span>
            </div>
          </a>
          <a className='enlaces-contacto'>
            <img className='enlaces-contacto__imagen' src={ImagenTiktok} alt="" />
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
            <img className='enlaces-contacto__imagen' src={ImagenLinkedin} alt="" />
            <div data-text="Awesome" className="enlaces-contacto__texto">
              <span className="actual-text">&nbsp;/company/cinvmex/&nbsp;</span>
              <span className="hover-text" aria-hidden="true">&nbsp;/company/cinvmex/&nbsp;</span>
            </div>
          </a>
          <a className='enlaces-contacto'>
            <img className='enlaces-contacto__imagen' src={ImagenCorreo} alt="" />
            <div data-text="Awesome" className="enlaces-contacto__texto">
              <span className="actual-text">&nbsp;atusordenes@centroidiomas.net&nbsp;</span>
              <span className="hover-text" aria-hidden="true">&nbsp;atusordenes@centroidiomas.net&nbsp;</span>
            </div>
          </a>
        </div>
        <div className='caja-contacto__demostracion'>
          <img src={ImagenContactanos} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Contactanos