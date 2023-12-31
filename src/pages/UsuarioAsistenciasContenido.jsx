
import FilasAsistenciasEntrada from "../components/FilasAsistenciasEntrada/FilasAsistenciasEntrada";

function UsuarioAsistenciasContenido(props) {
  const { asistencias } = props

  return (
    <div className="padd-top__20">
      <div className='container-tabla'>
        <table className='tabla'>
          <thead className='tabla-cabecera'>
            <tr>
              <th colSpan='1'>Entrada o Salida</th>
              <th colSpan='1'>Fecha de Asistencia</th>
              <th colSpan='1'>Hora</th>
              <th colSpan='1'>Horario</th>
              <th colSpan='1'>Modalidad</th>
            </tr>
          </thead>
          <tbody className="tabla-cuerpo">
          {
            asistencias.map((asis, index) => 
              <FilasAsistenciasEntrada 
                datos={asis} 
                key={index}
                posicion={index}
              />
            )
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsuarioAsistenciasContenido