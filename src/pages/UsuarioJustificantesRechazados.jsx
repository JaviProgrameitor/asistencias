import FilasJustificantes from "../components/FilasJustificantes/FilasJustificantes"

function UsuarioJustificantesRechazados(props) {
  const { fotoPrueba, setFotoPrueba, justificantes } = props

  return (
    <div>
      <h3 className='titulos-2'>Justificantes Rechazados</h3>
      <div className='container-tabla'>
        <table className='tabla'>
          <thead className='tabla-cabecera'>
              <tr>
                <th colSpan='1'>Hora de Emisión</th>
                <th colSpan='1'>Fecha de Emisión</th>
                <th colSpan='1'>Fecha a Justificar</th>
                <th colSpan='1'>Motivo</th>
                <th colSpan='1'>Explicación</th>
              </tr>
            </thead>
            <tbody className="tabla-cuerpo">
            {
              justificantes.map((justificante, index) => 
                <FilasJustificantes 
                  datos={justificante} 
                  key={index}
                  posicion={index}
                  valor={fotoPrueba}
                  cambiarValor={setFotoPrueba}
                  personal
                />
              )
            }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsuarioJustificantesRechazados