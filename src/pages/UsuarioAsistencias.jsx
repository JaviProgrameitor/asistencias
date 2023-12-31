
import { Routes, Route } from "react-router-dom"

import UsuarioAsistenciasContenido from "./UsuarioAsistenciasContenido";

function UsuarioAsistencias(props) {
  const { asistenciasEntrada } = props

  return (
    <div className="padd-x__20 padd-top__20">
      <h3 className='titulos-1'>Asistencias</h3>
      <Routes>
        <Route path='/' element={
            <UsuarioAsistenciasContenido 
              asistencias={asistenciasEntrada} 
            />
          } 
        />
      </Routes>
    </div>
  )
}

export default UsuarioAsistencias