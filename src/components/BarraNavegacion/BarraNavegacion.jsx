import '../../assets/css/components/BarraNavegacion.css'

import { Link, useResolvedPath } from "react-router-dom"

import Modal from '@mui/material/Modal';

function BarraNavegacion(props) {
  const { estadoNavbar, setEstadoNavbar, datos, enlaces, urlActual, panelControl=false } = props

  const url = useResolvedPath("").pathname

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
        <div className='contenedor__margin-top perfil-admin'>
          <img className='foto-perfil-admin' src={datos[0].foto} alt="Foto de Perfil" />
          <h3 className='perfil-admin__nombre info-admin'>{datos[0].nombre}</h3>
          <p className='perfil-admin__puesto info-admin'>{datos[0].puesto}</p>
          {
            panelControl && (
              <Link 
                to={`${url}/administradores/perfil-administrador`} 
                className='boton__blanco info-admin'
              >
                Ver Perfil
              </Link>
            )
          }
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
        {
          panelControl && (
            <Link 
              className='enlaces-moviles'
              to={`${url}/administradores/perfil-administrador`} 
            >
              <div>
                <img src={datos[0].foto} alt="Foto de Perfil" />
              </div>
            </Link>
          )
        }
      </nav>
    </>
  )
}

export default BarraNavegacion