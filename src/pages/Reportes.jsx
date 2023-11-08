
import { Routes, Route } from "react-router-dom"

import ReportesContenido from "./ReportesContenido"

function Reportes(props) {
  const { clases, idiomasImpartidos, asistenciasEntrada } = props

  return (
    <div className='container-justificantes'>
      <div className='contenedor__titulos-1'>
        <h3 className='titulos-1'>Reportes</h3>
      </div>
      <Routes>
        <Route 
          path='/' 
          element={
            <ReportesContenido 
              flechaRegresar={false} 
              asistencias={asistenciasEntrada.filter(asis => asis.entradaSalidaAsistencia == 'Entrada')}
              clases={clases}
              idiomasImpartidos={idiomasImpartidos.map(idioma => idioma.nombre)}
            />
          } 
        />
      </Routes>
    </div>
  )
}

export default Reportes