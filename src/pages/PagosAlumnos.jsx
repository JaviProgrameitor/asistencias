import '../assets/css/PagosAlumnos.css'

import { useState } from "react";
import { Routes, Route } from "react-router-dom"

import CrearPago from './CrearPago';
import TablaPagoAlumno from './TablaPagoAlumno';

function PagosAlumnos(props) {
  const { perfilAlumno, pagosMensualidades, puestoAdmin } = props
  const [ pagoSeleccionado, setPagoSeleccionado ] = useState(false)

  return (
    <div>
      <Routes>
        <Route 
          path='/'
          element={
            <TablaPagoAlumno 
              perfilAlumno={perfilAlumno}
              pagosMensualidades={pagosMensualidades}
              pagoSeleccionado={pagoSeleccionado}
              setPagoSeleccionado={setPagoSeleccionado}
              puestoAdmin={puestoAdmin}
            />
          }
        />
        <Route 
          path='/crear-pago'
          element={
            <CrearPago 
              perfilAlumno={perfilAlumno}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default PagosAlumnos