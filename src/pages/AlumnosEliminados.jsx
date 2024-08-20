
import { useState } from "react"
import { Routes, Route } from "react-router-dom"

import TablaAlumnosEliminados from "./TablaAlumnosEliminados"
import PerfilAlumno from "./PerfilAlumno"

function AlumnosEliminados(props) {
  const { alumnosEliminados, puestoAdmin } = props

  const [ idAlumno, setIdAlumno ] = useState(null)

  return (
    <>
      <Routes>
        <Route 
          path='/' 
          element={
            <TablaAlumnosEliminados 
              alumnosEliminados={alumnosEliminados}
              alumnoSeleccionado={idAlumno != null ? alumnosEliminados.find(alumno => alumno.id === idAlumno) : {}}
              idAlumno={idAlumno}
              setIdAlumno={setIdAlumno}
              puestoAdmin={puestoAdmin}
            />
          } 
        />
        <Route 
          path='/perfil/:identificador' 
          element={
            <PerfilAlumno 
              datos={alumnosEliminados.find(alumno => alumno.id === idAlumno)}
              tipo='enSeguimiento'
            />
          } 
        />
      </Routes>
    </>
  )
}

export default AlumnosEliminados