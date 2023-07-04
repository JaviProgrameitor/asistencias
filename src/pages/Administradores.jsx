import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom"

import { initializeApp } from "firebase/app";
import { collection, onSnapshot, getFirestore  } from "firebase/firestore";
import firebaseConfig from '../firebase';

import TablaAdministradors from './TablaAdministradores'
import AgregarAdministrador from './AgregarAdministrador';

function Administradores(props) {
  const { puestoAdmin } = props

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  const [ administradores, setAdministradores ] = useState([])
  const [ perfilAdministrador, setPerfilAdministrador ] = useState()
  const [ idAdministrador, setIdAdministrador ] = useState(false)

  function actualizarDatos(datos) {
    setPerfilAdministrador(datos)
    setIdAdministrador(datos.id)
  }

    //Todo: Función para leer los datos de la base de datos
    useEffect(
      () => 
        onSnapshot(collection(db, 'administradores'),(snapshot) => 
          setAdministradores(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        ),
        [db]
    )

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
            />} 
        />
        <Route path='/agregar-administrador' element={<AgregarAdministrador administradores={administradores} />} />
      </Routes>
    </div>
  )
}

export default Administradores