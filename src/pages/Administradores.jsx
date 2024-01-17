import { useState } from 'react';
import { Routes, Route } from "react-router-dom"

import TablaAdministradors from './TablaAdministradores'
import AgregarAdministrador from './AgregarAdministrador';
import PerfilAdministrador from './PerfilAdministrador';
import ActualizarAdministrador from './ActualizarAdministrador';

function Administradores(props) {
  const { puestoAdmin, administradores, adminActivo } = props

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
        <Route 
          path='/perfil-administrador' 
          element={
            <PerfilAdministrador 
              adminActivo={adminActivo}
            />
          } 
        />
        <Route 
          path='/actualizar-administrador' 
          element={
            <ActualizarAdministrador 
              adminActivo={adminActivo}
            />
          } 
        />
      </Routes>
    </div>
  )
}

export default Administradores