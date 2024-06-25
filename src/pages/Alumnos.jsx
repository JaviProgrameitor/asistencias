import { useState } from 'react';
import { Routes, Route } from "react-router-dom"

import TablaAlumnos from './TablaAlumnos';
import PerfilAlumno from './PerfilAlumno';
import AgregarAlumno from './AgregarAlumno';
import EditarAlumno from './EditarAlumno';
import PagosAlumnos from './PagosAlumnos';
import ActividadAlumno from './ActividadAlumno';
import TablaAlumnosEliminados from './TablaAlumnosEliminados';

function Alumnos(props) {
  const { 
    admin, 
    puestoAdmin, 
    alumnos, 
    asistenciasEntrada, 
    idiomasImpartidos, 
    justificantes,
    pagosMensualidades,
    alumnosEliminados
  } = props

  const [ perfilAlumno, setPerfilAlumno ] = useState({})
  const [ idAlumno, setIdAlumno ] = useState(false)
  const [ claveEstudiante, setClaveEstudiante ] = useState("")
  const [ coordenadasAlumno, setCoordenadasAlumno ] = useState(0)

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
              justificantes={justificantes}
              pagosMensualidades={pagosMensualidades}
              idiomasImpartidos={idiomasImpartidos.map(idioma => idioma.nombre)}
              coordenadasAlumno={coordenadasAlumno}
              setCoordenadasAlumno={setCoordenadasAlumno}
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
              actualizarDatosAlumno={actualizarDatos}
              asistenciasEntrada={asistenciasEntrada.filter((asis) => asis.claveEstudianteAsistenciaEntrada == claveEstudiante)}
              justificantes={justificantes.filter(justi => justi.claveEstudianteJustificante == claveEstudiante)}
              pagosMensualidades={pagosMensualidades.filter(pago => pago.idPropietario == idAlumno)}
            />
          } 
        />
        <Route 
          path='/perfil/:identificador' 
          element={
            <PerfilAlumno 
              idAlumno={idAlumno} 
              datos={alumnos.find(alumno => alumno.id == idAlumno)} 
              actualizarDatos={actualizarDatos}
            />
          } 
        />
        <Route 
          path='/pagos-alumnos/*' 
          element={
            <PagosAlumnos 
              alumnos={alumnos.map(alumno => `${alumno.nombre} ${alumno.apellido}`)}
              perfilAlumno={perfilAlumno} 
              pagosMensualidades={pagosMensualidades.filter(pago => pago.idPropietario == idAlumno)}
              puestoAdmin={puestoAdmin}
            />
          } 
        />
        <Route 
          path='/actividad-alumno' 
          element={
            <ActividadAlumno 
              pagosMensualidades={pagosMensualidades.filter(pago => pago.idPropietario == idAlumno)}
              asistenciasEntrada={asistenciasEntrada.filter((asis) => asis.claveEstudianteAsistenciaEntrada == claveEstudiante && asis.entradaSalidaAsistencia == 'Entrada')}
              justificantesAceptados={justificantes.filter(justi => justi.claveEstudianteJustificante == claveEstudiante && justi.estado == 'Aceptado')}
              justificantesEnEspera={justificantes.filter(justi => justi.claveEstudianteJustificante == claveEstudiante && justi.estado == 'EnEspera')}
              justificantesRechazados={justificantes.filter(justi => justi.claveEstudianteJustificante == claveEstudiante && justi.estado == 'Rechazado')}
            />
          } 
        />
        <Route 
          path='/alumnos-eliminados' 
          element={
            <TablaAlumnosEliminados 
              alumnosEliminados={alumnosEliminados}
            />
          } 
        />
      </Routes>
    </div>
  )
}

export default Alumnos