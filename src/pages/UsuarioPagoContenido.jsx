
import { useState } from "react"
import { FcStackOfPhotos } from 'react-icons/fc'
import { TiDelete } from 'react-icons/ti'

import FilasPagos from "../components/FilasPagos/FilasPagos"

import Modal from '@mui/material/Modal';

function UsuarioPagoContenido(props) {
  const { pagosMensualidades, pagoSeleccionado, setPagoSeleccionado } = props

  const [ modalFotoEstado, setModalFotoEstado ] = useState(false)
  return (
    <div className="padd-top__20">
      {
        pagoSeleccionado !== false ?
          <div className='contenedor__todo-final contenedor__padding-top'>
            <button
              className="boton__blanco"
              onClick={() => setModalFotoEstado(true)}
            >
              Ver Comprobante Pago
            </button>
          </div>
        : <></>
      }
      <div className='container-tabla'>
        <table className='tabla'>
          <thead className='tabla-cabecera'>
            <tr>
              <th colSpan='1'>Idioma Pagado</th>
              <th colSpan='1'>Fecha que Pagó</th>
              <th colSpan='1'>Fecha Mensualidad</th>
            </tr>
          </thead>
          <tbody className="tabla-cuerpo">
            {
              pagosMensualidades.map((pago, index) => 
                <FilasPagos 
                  datos={pago} 
                  posicion={index}
                  pagoSeleccionado={pagoSeleccionado}
                  setPagoSeleccionado={setPagoSeleccionado}
                  personal
                  key={index}
                />
              )
            }
          </tbody>
        </table>
      </div>
      <Modal
        className="modal__superior"
        open={modalFotoEstado}
        onClose={() => setModalFotoEstado(false)}
      >
        <img 
          className='foto-prueba centrar__contenido' 
          src={pagoSeleccionado.comprobantePagoMensualidad} 
          alt='Foto de la prueba del justificante'
          onClick={() => setModalFotoEstado(false)}
        />
      </Modal>
    </div>
  )
}

export default UsuarioPagoContenido