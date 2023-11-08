import '../assets/css/Home.css'

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsTelephoneFill } from 'react-icons/bs'
import { FcOk, FcCalendar } from 'react-icons/fc'
import { FaLanguage } from 'react-icons/fa'

import logo from '../assets/img/logo.png'
import ImagenMancha from '../assets/img/mancha.png'
import ImagenClasesGrupales from '../assets/img/clases-grupales.png'
import ImagenClasesIndividuales from '../assets/img/clases-individuales2.png'
import ImagenInterpretacion from '../assets/img/interpretación.jpg'
import ImagenTraduccion from '../assets/img/traducción.png'
import ImagenModalidadPresencial from '../assets/img/presencial.jpg'
import ImagenModalidadOnline from '../assets/img/online.png'
import ImagenGrupo from '../assets/img/grupo.png'
import ImagenManos from '../assets/img/manos.png'
import ImagenEquipo from '../assets/img/equipo.png'
import ImagenMetodologia from '../assets/img/metodología.png'
import ImagenWhatsapp from '../assets/img/whatsapp.png'
import ImagenCorreo from '../assets/img/gmail.png'
import ImagenLinkedin from '../assets/img/linkedin.png'
import ImagenFacebook from '../assets/img/facebook.png'
import ImagenInstagram from '../assets/img/instagram.png'
import ImagenTiktok from '../assets/img/tik-tok.png'
import ImagenContactanos from '../assets/img/contactanos.webp'

import AOS from 'aos';
import 'aos/dist/aos.css';

function Home(props) {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className='promocional'>

      {/* Navbar */}

      <nav className='navbar'>
        <picture id='inicio' className='contenedor-logo contenedor__todo-principio-centrado'>
          <img className='contendor-logo__logo' src={logo} alt="Logo del Centro de Idiomas" />
          <h3 className='contenedor-logo__nombre'>Centro de Idiomas</h3>
        </picture>
        <ul className='navbar__enlaces contenedor__todo-principio contenedor__gap-15'>
          <li><a href='#inicio'>Inicio</a></li>
          <li><a href={'#quienes-somos'}>Quiénes Somos</a></li>
          <li><a href='#nuestros-servicios'>Servicios</a></li>
          <li><a href='#contacto'>Contáctanos</a></li>
          <li><Link to={'./sistema-asistencias'} >Sistema</Link></li>
        </ul>
      </nav>

      {/* Navbar */}

      <main className='contenedor-promocional__contenido'>

        {/* Presentación */}

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

        {/* Presentación */}

        {/* Quiénes Somos */}

        <div className='caja-quienes-somos cajas__promocionales'>
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
        </div>

        {/* Quiénes Somos */}

        {/* Por qué estudiar en el Centro de Idiomas */}

        <div className='caja-por-que-razon cajas__promocionales'>
          <div className='contenedor__centrado-separacion'>
            <h3 className='titulos__promocionales'>¿Por qué estudiar en el Centro de Idiomas?</h3>
          </div>
          <div className='por-que-razon__contenido'>
            <div className='razones'>
              <h4 className='razones__titulo subtitulos__promocionales'>Razón 1</h4>
              <div className='razones__contenido'>
                <BsTelephoneFill className='razones__contenido__icon' />
                <p className='razones__contenido__texto'>
                  Ea dolor anim aute veniam occaecat cillum anim laboris officia. 
                  Veniam ut magna culpa minim ipsum est excepteur laborum dolore irure exercitation aute.
                </p>
              </div>
            </div>
            <div className='razones'>
              <h4 className='razones__titulo subtitulos__promocionales'>Razón 2</h4>
              <div className='razones__contenido'>
                <BsTelephoneFill className='razones__contenido__icon' />
                <p className='razones__contenido__texto'>
                  Ea dolor anim aute veniam occaecat cillum anim laboris officia. 
                  Veniam ut magna culpa minim ipsum est excepteur laborum dolore irure exercitation aute.
                </p>
              </div>
            </div>
            <div className='razones'>
              <h4 className='razones__titulo subtitulos__promocionales'>Razón 3</h4>
              <div className='razones__contenido'>
                <BsTelephoneFill className='razones__contenido__icon' />
                <p className='razones__contenido__texto'>
                  Ea dolor anim aute veniam occaecat cillum anim laboris officia. 
                  Veniam ut magna culpa minim ipsum est excepteur laborum dolore irure exercitation aute.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Por qué estudiar en el Centro de Idiomas */}

        {/* Nuestros Servicios */}

        <div className='caja-nuestros-servicios cajas__promocionales'>
          <div className='nuestros-servicios__contenedor-titulo'>
            <h3 id='nuestros-servicios' className='titulos__promocionales'>Nuestros Servicios</h3>
          </div>
          <div className='nuestros-servicios__contenido'>
            <div className='servicio'>
              <div className='servicio__imagen'>
                <img src={ImagenClasesGrupales} alt="" />
              </div>
              <h4 className='servicio__titulo subtitulos__promocionales'>Clases Grupales</h4>
              <p className='servicio__texto'>
                Altamente interactivas, en cada clase, el estudiante participa en un taller lingüistico productivo cada sesión.
              </p>
            </div>
            <div className='servicio'>
              <div className='servicio__imagen'>
                <img src={ImagenClasesIndividuales} alt="" />
              </div>
              <h4 className='servicio__titulo subtitulos__promocionales'>Clases Individuales</h4>
              <p className='servicio__texto'>
                Práctica intensiva del idioma, involucrando al estudiante en conversaciones significativas, 
                ejercicios interactivos y experiencias de inmersión. 
                Nuestros expertos proporcionan retroalimentación inmediata, 
                corrigiendo y ayudando así al estudiante a perfeccionar sus habilidades lingüisticas.
              </p>
            </div>
            <div className='servicio'>
              <div className='servicio__imagen'>
                <img src={ImagenInterpretacion} alt="" />
              </div>
              <h4 className='servicio__titulo subtitulos__promocionales'>Interpretación Simultánea en Tiempo Real</h4>
              <p className='servicio__texto'>
                Hablado o escrito, hacemos que personas que hablan idiomas diferentes se comuniquen eficazmente; 
                especialmente en situaciones tales como: conferencias, reuniones, entrevistas, 
                presentaciones o cualquier otra forma de comunicación en directo.
              </p>
            </div>
            <div className='servicio'>
              <div className='servicio__imagen'>
                <img src={ImagenTraduccion} alt="" />
              </div>
              <h4 className='servicio__titulo subtitulos__promocionales'>Traducción de Textos</h4>
              <p className='servicio__texto'>
                Nuestros traductores humanos, son profesionistas y profesionales expertos en lenguas y en temas específicos. 
                Mismos que controlan los matices, las referencias culturales y expresiones idiomáticas de la lengua de origen, 
                transmitiendo al mismo tiempo la intención deseada en la lengua meta.
              </p>
            </div>
          </div>
        </div>

        {/* Nuestros Servicios */}

        {/* Modalidades */}

        <div className='caja-modalidades cajas__promocionales'>
          <div className='contenedor__centrado-separacion'>
            <h3 id='nuestros-servicios' className='titulos__promocionales'>Modalidades</h3>
          </div>
          <div className='caja-modalidades__contenido'>
            <div className='modalidad'>
              <h3 className='modalidad__titulo subtitulos__promocionales'>Presencial</h3>
              <div className='modalidad__contenido'>
                <p>Estudia presencialmente en el Centro de Idiomas</p>
                <img src={ImagenModalidadPresencial} alt="" />
              </div>
            </div>
            <div className='modalidad'>
              <h3 className='modalidad__titulo subtitulos__promocionales'>Online</h3>
              <div className='modalidad__contenido'>
                <p>Estudia de manera online con maestros en vivo</p>
                <img src={ImagenModalidadOnline} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Modalidades */}

        {/* Modulos */}

        <div className='caja-modulos cajas__promocionales' >
          <div className='modulos__contenedor-titulo'>
            <h3 id='nuestros-servicios' className='titulos__promocionales'>Camino al éxito lingüístico</h3>
          </div>
          <div className='caja-modulos__contenido'>
            <div className='modulos__informacion'>
              <h4 className='modulos__informacion__titulo'>Niveles</h4>
              <ul className='lista-modulos'>
                <li className='modulo'>
                  <div className='modulo__contenido'>
                    <FcOk />
                    <span>Principiante</span>
                  </div>
                  <ul className='lista-submodulos'>
                    <li className='submodulo'>
                      <div className='submodulo__contenido'>
                        <FcCalendar />
                        <span>4 meses</span>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className='modulo'>
                  <div className="modulo__contenido">
                    <FcOk />
                    <span>Intermedio</span>
                  </div>
                  <ul className='lista-submodulos'>
                    <li className='submodulo'>
                      <div className='submodulo__contenido'>
                        <FcCalendar />
                        <span>5 meses</span>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className='modulo'>
                  <div className="modulo__contenido">
                    <FcOk />
                    <span>Avanzado</span>
                  </div>
                  <ul className='lista-submodulos'>
                    <li className='submodulo'>
                      <div className='submodulo__contenido'>
                        <FcCalendar />
                        <span>3 meses</span>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className='modulos__imagen'></div>
          </div>
        </div>

        {/* Modulos */}

        {/* Metodología */}

        <div className='caja-metodologia cajas__promocionales'>
          <div className='metodologia__contenedor-titulo'>
            <h3 id='nuestros-servicios' className='titulos__promocionales'>Exclusiva Metodología</h3>
          </div>
          <div className="caja-metodologia__contenido parent">
            <div className="metodologia-introduccion div1">
              <p>
                Nuestro método “Multiprofesores en Simultáneo” manifiesta un enfoque de educación que implica 
                a varios profesores trabajando juntos para proporcionar instrucción y apoyo a los alumnos en tiempo real.
              </p>
              <p>
                Este sistema puede adoptar diversas formas, según el contexto, las necesidades específicas de los 
                alumnos y los objetivos educativos estipulados para el éxito lingüistico.
              </p>
            </div>
            <div className="metodologia-ejemplos">
              <div className='ejemplo'>
                <img className='ejemplo__imagen' src={ImagenGrupo} alt="" />
                <p className='ejemplo__texto'>
                  Juntos en la misma aula física o virtual, compartiendo las responsabilidades de 
                  enseñar diferentes aspectos del plan de estudios.
                </p>
              </div>
              <div className='ejemplo'>
                <img className='ejemplo__imagen' src={ImagenManos} alt="" />
                <p className='ejemplo__texto'>
                  Permite una diversidad de estilos de enseñanza, experiencia y perspectivas, 
                  lo que beneficia a los estudiantes al proporcionarles una experiencia de aprendizaje más enriquecedora.
                </p>
              </div>
              <div className='ejemplo'>
                <img className='ejemplo__imagen' src={ImagenEquipo} alt="" />
                <p className='ejemplo__texto'>
                  Apoyo individualizado a nuestros pupilos en función de sus necesidades y estilo de aprendizaje.
                  <br />
                  Cuando ellos necesitan ayuda adicional o adaptaciones en la explicación requerida: 
                  el tener varios profesores permite una atención altamente personalizada; lo que deriva en un 
                  aprendizaje más significativo.
                </p>
              </div>
            </div>
            <div className="metodologia-demostracion div3">
              <img className='demostracion__imagen' src={ImagenMetodologia} alt="" />
            </div>
          </div>
        </div>

        {/* Metodología */}

        {/* Contactanos */}

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

        {/* Contactanos */}

      </main>

      {/* Footer */}

      <footer className='contenedor-footer cajas__promocionales'>
        <picture className='contenedor-footer__informacion'>
          <img src={logo} alt="" />
          <h3>Centro de Idiomas</h3>
        </picture>
        <p className='contenedor-footer__derechos-autor'>Todos los derechos reservados. La marca y el logo son marcas registradas.</p>
      </footer>

      {/* Footer */}

      {/* Boton flotante Whatsapp */}

      <div className='boton__whatsapp'>
        <a
          className="whatsapp" 
          target="_blank"
          href="https://api.whatsapp.com/send?phone=+527681017928&text=Informaci%C3%B3n" 
        > 
          <i className="fa fa-whatsapp whatsapp-icon"></i>
        </a>
        <div className='whatsapp whatsapp__onda'>

        </div>
      </div>

      {/* Boton flotante Whatsapp */}
    </div>
  )
}

export default Home