

function FilasAsistenciasEntrada(props) {
  const { posicion, personales = false } = props
  const { 
    nombreAsistenciaEntrada, 
    apellidoAsistenciaEntrada,
    claveEstudianteAsistenciaEntrada,
    fechaInternaAsistenciaEntrada,
    fechaAsistenciaEntrada,
    diasHorarios,
    horaHorario,
    claveHorario,
    puntualidadClase,
    modalidadClase,
    entradaSalidaAsistencia,
    idiomaAsistenciaEntrada,
  } = props.datos

  return (
    <tr className={`fila fila-administrador ${posicion % 2 === 0 ? 'elemento-par' : 'elemento-impar'}`}>
      <td className='td-admin'>{entradaSalidaAsistencia}</td>
      {
        personales
          ? <>
              <td className='td-admin'>{nombreAsistenciaEntrada}</td>
              <td className='td-admin'>{apellidoAsistenciaEntrada}</td>
            </>
          : <></>
      }
      <td className='td-admin'>{new Date(fechaAsistenciaEntrada).toLocaleDateString()}</td>
      <td className='td-admin'>
        <span>{`${new Date(fechaAsistenciaEntrada).getHours()}:${new Date(fechaAsistenciaEntrada).getMinutes()}`}</span><br />
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