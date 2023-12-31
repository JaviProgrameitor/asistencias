import { useState } from 'react';
import { Routes, Route } from "react-router-dom"

import TablaAdministradors from './TablaAdministradores'
import AgregarAdministrador from './AgregarAdministrador';

function Administradores(props) {
  const { puestoAdmin, administradores } = props

  const [ perfilAdministrador, setPerfilAdministrador ] = useState()
  const [ idAdministrador, setIdAdministrador ] = useState(false)

  function actualizarDatos(datos) {
    if(datos === false) {
      setPerfilAdministrador(null)
      setIdAdministrador(false)
    }

    else {
      setPerfilAdministrador(datos)
      setIdAdministrador(datos.id)
    }
  }

  return (
    <div className="container-administradores">
      <div className='contenedor__titulos-1'>
        <h3 className='titulos-1'>Administradores</h3>
      </div>
      <Routes>
        <Route 
          path='/' 
          element={
            <TablaAdministradors 
              puestoAdmin={puestoAdmin}
              perfilAdministrador={perfilAdministrador} 
              setPerfilAdministrador={setPerfilAdministrador} 
              idAdministrador={idAdministrador}
              setIdAdministrador={setIdAdministrador}
              actualizarDatos={actualizarDatos}
              administradores={administradores} 
            />
          } 
        />
        <Route 
          path='/agregar-administrador' 
          element={
            <AgregarAdministrador 
              administradores={administradores} 
            />
          } 
        />
      </Routes>
    </div>
  )
}

export default Administradores