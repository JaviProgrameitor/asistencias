import '../../assets/css/components/Modulos.css'

import { FcOk, FcCalendar } from 'react-icons/fc'

function Modulos() {
  return (
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
  )
}

export default Modulos