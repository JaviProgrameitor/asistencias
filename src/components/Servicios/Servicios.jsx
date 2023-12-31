import '../../assets/css/components/Servicios.css'

import ImagenClasesGrupales from '../../assets/img/clases-grupales.png'
import ImagenClasesIndividuales from '../../assets/img/clases-individuales2.png'
import ImagenInterpretacion from '../../assets/img/interpretación.jpg'
import ImagenTraduccion from '../../assets/img/traducción.png'

function Servicios() {
  return (
    <div className='caja-nuestros-servicios cajas__promocionales'>
      <div className='nuestros-servicios__contenedor-titulo'>
        <h3 id='nuestros-servicios' className='titulos__promocionales'>Nuestros Servicios</h3>
      </div>
      <div className='nuestros-servicios__contenido'>
        <div className='servicio' data-aos="zoom-in">
          <div className='servicio__imagen'>
            <img src={ImagenClasesGrupales} alt="" />
          </div>
          <h4 className='servicio__titulo subtitulos__promocionales'>Clases Grupales</h4>
          <p className='servicio__texto'>
            Altamente interactivas, en cada clase, el estudiante participa en un taller lingüistico productivo cada sesión.
          </p>
        </div>
        <div className='servicio' data-aos="zoom-in">
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
        <div className='servicio' data-aos="zoom-in">
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
        <div className='servicio' data-aos="zoom-in">
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
  )
}

export default Servicios