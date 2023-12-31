import '../../assets/css/components/RazonesEstudio.css'

import { BsTelephoneFill } from 'react-icons/bs'

function RazonesEstudio() {
  return (
    <div className='caja-por-que-razon cajas__promocionales'>
      <div className='contenedor__centrado-separacion'>
        <h3 className='titulos__promocionales'>¿Por qué estudiar en el Centro de Idiomas?</h3>
      </div>
      <div className='por-que-razon__contenido'>
        <div className='razones' data-aos="zoom-in">
          <h4 className='razones__titulo subtitulos__promocionales'>Razón 1</h4>
          <div className='razones__contenido'>
            <BsTelephoneFill className='razones__contenido__icon' />
            <p className='razones__contenido__texto'>
              Ea dolor anim aute veniam occaecat cillum anim laboris officia. 
              Veniam ut magna culpa minim ipsum est excepteur laborum dolore irure exercitation aute.
            </p>
          </div>
        </div>
        <div className='razones' data-aos="zoom-in">
          <h4 className='razones__titulo subtitulos__promocionales'>Razón 2</h4>
          <div className='razones__contenido'>
            <BsTelephoneFill className='razones__contenido__icon' />
            <p className='razones__contenido__texto'>
              Ea dolor anim aute veniam occaecat cillum anim laboris officia. 
              Veniam ut magna culpa minim ipsum est excepteur laborum dolore irure exercitation aute.
            </p>
          </div>
        </div>
        <div className='razones' data-aos="zoom-in">
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
  )
}

export default RazonesEstudio