import '../../assets/css/components/BarraNavegacion.css'

import { Link } from "react-router-dom"

import Modal from '@mui/material/Modal';

function BarraNavegacion(props) {
  const { estadoNavbar, setEstadoNavbar, datos, enlaces, urlActual } = props

  function comprobarUrl(urlAct, urlCom, index) {
    if(index === 0) {
      if(urlAct == urlCom) return true
      else return false
    }

    else {
      if(urlAct.includes(urlCom)) return true
      else return false
    }
  }

  return (
    <>
      <Modal
        className='modal__medio'
        open={estadoNavbar}
      >
        <></>
      </Modal>
      <aside 
        className={`container-panel-control__aside ${estadoNavbar ? 'aside-activo' : ''}`} 
        onMouseEnter={() => setEstadoNavbar(true)}
        onMouseLeave={() => setEstadoNavbar(false)}
      >
        <div className='perfil-admin contenedor__margin-top'>
          <img className='foto-perfil-admin' src={datos[0].foto} alt="Foto de Perfil del Admin" />
          <h3 className='perfil-admin__nombre info-admin'>{datos[0].nombre}</h3>
          <p className='perfil-admin__correo info-admin'>{datos[0].correo}</p>
          <p className='perfil-admin__puesto info-admin'>{datos[0].puesto}</p>
        </div>
        <div className='panel-control__enlaces'>
          {
            enlaces.map((enlace, index) => {
              return (
                <Link 
                  className={`enlaces ${comprobarUrl(urlActual, enlace.destino, index) ? "enlaces-activos" : ""}`}
                  to={enlace.destino} 
                  key={index}
                >
                  <div>
                    <enlace.icon />
                    <span>{enlace.titulo}</span>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </aside>

      <nav
        className='container-panel-control__navbar'
      >
        {
          enlaces.map((enlace, index) => {
            return (
              <Link 
                className={`enlaces-moviles ${comprobarUrl(urlActual, enlace.destino, index) ? "enlaces-moviles-activos" : ""}`}
                to={enlace.destino} 
                key={index}
              >
                <div>
                  <enlace.icon />
                  <span>{enlace.titulo}</span>
                </div>
              </Link>
            )
          })
        }
      </nav>
    </>
  )
}

export default BarraNavegacion