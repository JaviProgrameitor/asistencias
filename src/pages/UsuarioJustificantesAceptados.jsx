import FilasUsuarioJustificantes from '../components/FilasUsuarioJustificantes/FilasUsuarioJustificantes';

function UsuarioJustificantesAceptados(props) {
  const { fotoPrueba, setFotoPrueba, justificantes } = props

  return (
    <div>
      <h3 className='titulos-2'>Justificantes Aceptados</h3>
      <div className='container-tabla'>
        <table className='tabla'>
          <thead className='tabla-cabecera'>
              <tr>
                <th colSpan='1'>Hora de Emisión</th>
                <th colSpan='1'>Hora de Emisión</th>
                <th colSpan='1'>Fecha a Justificar</th>
                <th colSpan='1'>Motivo</th>
                <th colSpan='1'>Explicación</th>
              </tr>
            </thead>
            <tbody className="tabla-cuerpo">
            {
              justificantes.map((alumno, index) => 
                <FilasUsuarioJustificantes 
                  datos={alumno} 
                  key={index}
                  posicion={index}
                  valor={fotoPrueba}
                  cambiarValor={setFotoPrueba}
                />
              )
            }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsuarioJustificantesAceptados