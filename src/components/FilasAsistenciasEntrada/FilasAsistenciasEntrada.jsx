
import { useState, useEffect } from "react"

function FilasAsistenciasEntrada(props) {
  const { posicion, personales = false } = props
  const { 
    nombreAsistenciaEntrada, 
    apellidoAsistenciaEntrada, 
    claveEstudianteAsistenciaEntrada, 
    fechaCompletaAsistenciaEntrada,
    horaAsistenciaEntrada, 
    diaAsistenciaEntrada, 
    diasHorarios, 
    horaHorario, 
    puntualidadClase, 
    modalidadClase, 
    entradaSalidaAsistencia 
  } = props.datos
  const [tipo, setTipo] = useState()
  const [activo, setActivo] = useState()

  useEffect(() => {
    if(posicion === 0 || posicion % 2 === 0) setTipo('elemento-par')
    else setTipo('elemento-impar')
  })

  return (
    <tr className={`fila fila-administrador ${tipo} ${activo}`}>
      <td className='td-admin'>{entradaSalidaAsistencia}</td>
      {
        personales
          ? <>
              <td className='td-admin'>{nombreAsistenciaEntrada}</td>
              <td className='td-admin'>{apellidoAsistenciaEntrada}</td>
              <td className='td-admin'>{claveEstudianteAsistenciaEntrada}</td>
            </>
          : <></>
      }
      <td className='td-admin'>{fechaCompletaAsistenciaEntrada}</td>
      <td className='td-admin'>
        <span>{horaAsistenciaEntrada}</span><br />
        <span>{puntualidadClase}</span>
      </td>
      <td className='td-admin'>
        <span>{diasHorarios}</span><br />
        <span>{horaHorario}</span>
      </td>
      <td className='td-admin'>{modalidadClase}</td>
    </tr>
  )
}

export default FilasAsistenciasEntrada