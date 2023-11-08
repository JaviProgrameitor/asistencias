import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom"

import TablaAlumnos from './TablaAlumnos';
import PerfilAlumno from './PerfilAlumno';
import AgregarAlumno from './AgregarAlumno';
import EditarAlumno from './EditarAlumno';
import PagosAlumnos from './PagosAlumnos';
import ActividadAlumno from './ActividadAlumno';

function Alumnos(props) {
  const { 
    admin, 
    puestoAdmin, 
    alumnos, 
    asistenciasEntrada, 
    idiomasImpartidos, 
    justificantesEnEspera,
    justificantesRechazados,
    justificantesAceptados,
    pagosMensualidades
  } = props

  const [ perfilAlumno, setPerfilAlumno ] = useState({})
  const [ idAlumno, setIdAlumno ] = useState(false)
  const [ claveEstudiante, setClaveEstudiante ] = useState("")

  function actualizarDatos(datos) {
    if(datos === false) {
      setPerfilAlumno({})
      setIdAlumno(false)
      setClaveEstudiante("")
    }

    else {
      setPerfilAlumno(datos)
      setIdAlumno(datos.id)
      setClaveEstudiante(datos.claveEstudiante)
    }
  }

  return (
    <div className="container-alumnos">
      <div className="contenedor__titulos-1">
        <h3 className="titulos-1">Alumnos</h3>
      </div>
      <Routes>
        <Route 
          path='/' 
          element={
            <TablaAlumnos 
              admin={admin}
              puestoAdmin={puestoAdmin} 
              perfilAlumno={perfilAlumno} 
              actualizarDatos={actualizarDatos} 
              alumnos={alumnos} 
              idAlumno={idAlumno} 
              setIdAlumno={setIdAlumno} 
              asistenciasEntrada={asistenciasEntrada}
              justificantesAceptados={justificantesAceptados}
              justificantesEnEspera={justificantesEnEspera}
              justificantesRechazados={justificantesRechazados}
              pagosMensualidades={pagosMensualidades}
              idiomasImpartidos={idiomasImpartidos.map(idioma => idioma.nombre)}
            />
          } 
        />
        <Route 
          path='/agregar-alumno' 
          element={
            <AgregarAlumno 
              alumnos={alumnos}
              idiomasImpartidos={idiomasImpartidos.map(idioma => idioma.nombre)}
            />
          } 
        />
        <Route 
          path='/editar-alumno' 
          element={
            <EditarAlumno 
              idAlumno={idAlumno} 
              datos={perfilAlumno} 
              asistenciasEntrada={asistenciasEntrada.filter((asis) => asis.claveEstudianteAsistenciaEntrada == claveEstudiante)}
              justificantesAceptados={justificantesAceptados.filter(justi => justi.claveEstudianteJustificante == claveEstudiante)}
              justificantesEnEspera={justificantesEnEspera.filter(justi => justi.claveEstudianteJustificante == claveEstudiante)}
              justificantesRechazados={justificantesRechazados.filter(justi => justi.claveEstudianteJustificante == claveEstudiante)}
              pagosMensualidades={pagosMensualidades.filter(pago => pago.claveEstudiantePago == claveEstudiante)}
            />
          } 
        />
        <Route 
          path='/perfil/:identificador' 
          element={
            <PerfilAlumno 
              idAlumno={idAlumno} 
              datos={perfilAlumno} 
            />
          } 
        />
        <Route 
          path='/pagos-alumnos/*' 
          element={
            <PagosAlumnos 
              perfilAlumno={perfilAlumno} 
              pagosMensualidades={pagosMensualidades.filter(pago => pago.claveEstudiantePago == claveEstudiante)}
              puestoAdmin={puestoAdmin}
            />
          } 
        />
        <Route 
          path='/actividad-alumno' 
          element={
            <ActividadAlumno 
              pagosMensualidades={pagosMensualidades.filter(pago => pago.claveEstudiantePago == claveEstudiante)}
              asistenciasEntrada={asistenciasEntrada.filter((asis) => asis.claveEstudianteAsistenciaEntrada == claveEstudiante && asis.entradaSalidaAsistencia == 'Entrada')}
              justificantesAceptados={justificantesAceptados.filter(justi => justi.claveEstudianteJustificante == claveEstudiante)}
              justificantesEnEspera={justificantesEnEspera.filter(justi => justi.claveEstudianteJustificante == claveEstudiante)}
              justificantesRechazados={justificantesRechazados.filter(justi => justi.claveEstudianteJustificante == claveEstudiante)}
            />
          } 
        />
      </Routes>
    </div>
  )
}

export default Alumnos