import '../assets/css/PagosAlumnos.css'

import { useState } from "react";
import { Routes, Route } from "react-router-dom"

import TablaPagoAlumno from './TablaPagoAlumno';
import CrearPago from './CrearPago';
import CrearRecibo from './CrearRecibo';

function PagosAlumnos(props) {
  const { perfilAlumno, pagosMensualidades, puestoAdmin, alumnos } = props
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
        <Route 
          path='/crear-recibo'
          element={
            <CrearRecibo
              alumnos={alumnos}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default PagosAlumnos