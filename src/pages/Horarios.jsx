import '../assets/css/Horarios.css'

import { useEffect, useState } from 'react';
import { Routes, Route, Link, useResolvedPath } from "react-router-dom"

import Clases from './Clases';
import Idiomas from './Idiomas';

function Horarios(props) {
  const { clases, idiomasImpartidos, puestoAdmin } = props

  const [ urlActual, setUrlActual ] = useState(window.location.pathname)

  const url = useResolvedPath("").pathname

  useEffect(() => {
    setUrlActual(window.location.pathname)
  })

  return (
    <div className="container-horarios">
      <div className="contenedor__titulos-1">
        <h3 className="titulos-1">Horarios</h3>
      </div>
      <div className='container-links-horarios'>
        <div className='caja-links-horarios'>
          <Link 
            className={`links-horarios ${urlActual == url ? "links-horarios_activo" : ""}`} 
            to='/sistema-asistencias/panel-control/horarios'
          >
            Idiomas
          </Link>
        </div>
        <div className='caja-links-horarios'>
          <Link 
            className={`links-horarios ${urlActual.includes(`${url}/clases`) ? "links-horarios_activo" : ""}`} 
            to='/sistema-asistencias/panel-control/horarios/clases'
          >
            Clases
          </Link>
        </div>
      </div>
      <Routes>
        <Route 
          path='/'
          element={
            <Idiomas
              idiomasImpartidos={idiomasImpartidos}
              puestoAdmin={puestoAdmin}
            />
          }
        />
        <Route 
          path='/clases'
          element={
            <Clases
              idiomasImpartidos={idiomasImpartidos.map(idioma => idioma.nombre)}
              clases={clases}
              puestoAdmin={puestoAdmin}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default Horarios