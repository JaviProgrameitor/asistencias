
import { useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'

import FilasJustificantes from "../components/FilasJustificantes/FilasJustificantes"

import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';

function JustificantesRechazados(props) {
  const { justificantesRechazados } = props

  const [ fotoPrueba, setFotoPrueba ] = useState(false)
  const [ palabraFiltrar, setPalabraFiltrar ] = useState('')
  const [ filtrarJustificantes, setFiltrarJustificantes ] = useState(justificantesRechazados)
  const [ modalEstado, setModalEstado ] = useState(false)

  //Todo: Función para buscar JUSTIFICANTES por medio de nombres o apellidos
  async function busqueda(valor) {
    if(!valor) {
      setFiltrarJustificantes(justificantesRechazados)
      return
    }

    let aux = []
    for(let i = 0; i < justificantesRechazados.length; i++) {
      try {
        if(
          justificantesRechazados[i].fechaEmisionJustificante.includes(valor) ||
          justificantesRechazados[i].fechaJustificante.includes(valor)
        ) {
          aux.push(justificantesRechazados[i])
        }
      } catch {}
    }
    setFiltrarJustificantes(aux)
  }

  function cambiarValor(justificante) {
    justificante != false ? setFotoPrueba(justificante.fotoJustificante) : setFotoPrueba(false)
  }

  useEffect(() => {
    busqueda(palabraFiltrar)
  },[palabraFiltrar, justificantesRechazados])

  return (
    <div>
      <div className='contenedor__todo-principio'>
        <Link to={'/sistema-asistencias/panel-control/justificantes/alumnos'}>
          <FaArrowCircleLeft className='flecha-regresar icon-40' />
        </Link>
      </div>
      <h5 className='titulos-2'>Justificantes Rechazados</h5>
      {
        fotoPrueba 
          ? <div className='contenedor__todo-final'>
              <button className='boton__verde-oscuro' onClick={() => setModalEstado(true)}>Ver Prueba</button>
            </div>
          : <></>
      }
      <TextField 
        id="filled-basic" 
        label="Buscar Justificante" 
        variant="filled"
        fullWidth
        color='success'
        placeholder='Por fecha de emisión o fecha a justificar'
        margin='dense'
        onChange={(e) => setPalabraFiltrar(e.target.value)}
      />
      <div className="contenedor__tabla-scroll tamaño-tabla__250">
        <table className='tabla'>
          <thead className='tabla-cabecera tabla-cabecera__tabla-scroll'>
              <tr>
                <th colSpan='1'>Nombre</th>
                <th colSpan='1'>Apellido</th>
                <th colSpan='1'>Clave de Estudiante</th>
                <th colSpan='1'>Hora de Emisión</th>
                <th colSpan='1'>Fecha de Emisión</th>
                <th colSpan='1'>Fecha a Justificar</th>
                <th colSpan='1'>Motivo</th>
                <th colSpan='1'>Explicación</th>
              </tr>
          </thead>
          <tbody className="tabla-cuerpo">
            {
              filtrarJustificantes.map((alumno, index) => 
                <FilasJustificantes 
                  datos={alumno} 
                  key={index}
                  posicion={index}
                  valor={fotoPrueba}
                  cambiarValor={cambiarValor}
                  ultimaFila={false}
                />
              )
            }
          </tbody>
        </table>
      </div>
      <Modal
        open={modalEstado}
        onClose={() => setModalEstado(false)}
      >
        <div className='caja-foto-prueba'>
          <TiDelete className='foto-prueba__icon' onClick={() => setModalEstado(false)} />
          <img className='foto-prueba' src={fotoPrueba} alt="" />
        </div>
      </Modal>
    </div>
  )
}

export default JustificantesRechazados