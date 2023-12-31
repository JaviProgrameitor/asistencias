
import { useState } from "react"
import { Routes, Route } from "react-router-dom"

import UsuarioPagoContenido from "./UsuarioPagoContenido"

function UsuarioPago(props) {
  const { pagosMensualidades } = props
  const [ pagoSeleccionado, setPagoSeleccionado ] = useState(false)

  return (
    <div className="padd-x__20 padd-top__20">
      <h3 className='titulos-1'>Pagos Mensualidades</h3>
      <Routes>
        <Route 
          path='/' 
          element={
            <UsuarioPagoContenido
              pagosMensualidades={pagosMensualidades}
              pagoSeleccionado={pagoSeleccionado}
              setPagoSeleccionado={setPagoSeleccionado}
            />
          } 
        />
      </Routes>
    </div>
  )
}

export default UsuarioPago