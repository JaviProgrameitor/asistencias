
import { useEffect, useState } from 'react';

import FilasUsuarioJustificantes from '../components/FilasUsuarioJustificantes/FilasUsuarioJustificantes';

function UsuarioJustificantesRechazados(props) {
  const { datos, fotoPrueba, setFotoPrueba } = props

  const [ justificantes, setJustificantes ] = useState(datos)

  return (
    <div>
      <div className='container-tabla'>
        <table className='tabla-alumnos'>
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
              justificantes ? justificantes.map((alumno, index) => <FilasUsuarioJustificantes 
                  datos={alumno} 
                  key={index}
                  posicion={index}
                  valor={fotoPrueba}
                  cambiarValor={setFotoPrueba}
                />
              ) 
              : <></>
            }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsuarioJustificantesRechazados