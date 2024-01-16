import '../../assets/css/components/Modalidades.css'

import ImagenModalidadPresencial from '../../assets/img/presencial.jpg'
import ImagenModalidadOnline from '../../assets/img/online.png'

function Modalidades() {
  return (
    <div className='caja-modalidades cajas__promocionales'>
      <div className='contenedor__centrado-separacion'>
        <h3 id='nuestros-servicios' className='titulos__promocionales'>Modalidades</h3>
      </div>
      <div className='caja-modalidades__contenido'>
        <div className='modalidad' data-aos="zoom-in">
          <h3 className='modalidad__titulo subtitulos__promocionales'>Presencial</h3>
          <div className='modalidad__contenido'>
            <p>Estudia presencialmente en el Centro de Idiomas</p>
            <img src={ImagenModalidadPresencial} alt="Imagen representando las clases presenciales" />
          </div>
        </div>
        <div className='modalidad' data-aos="zoom-in">
          <h3 className='modalidad__titulo subtitulos__promocionales'>En Línea</h3>
          <div className='modalidad__contenido'>
            <p>Estudia de manera online con maestros en vivo</p>
            <img src={ImagenModalidadOnline} alt="Imagen representando las clases en línea" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modalidades