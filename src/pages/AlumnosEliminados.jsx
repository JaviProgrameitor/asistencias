
import { useState } from "react"
import { Routes, Route } from "react-router-dom"

import TablaAlumnosEliminados from "./TablaAlumnosEliminados"
import PerfilAlumno from "./PerfilAlumno"

function AlumnosEliminados(props) {
  const { alumnosEliminados } = props

  const [ idAlumno, setIdAlumno ] = useState(null)

  return (
    <>
      <Routes>
        <Route 
          path='/' 
          element={
            <TablaAlumnosEliminados 
              alumnosEliminados={alumnosEliminados}
              idAlumno={idAlumno}
              setIdAlumno={setIdAlumno}
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