import '../assets/css/TablaJustificantes.css'

import { useState, useEffect } from 'react'
import { Link, useResolvedPath } from "react-router-dom"
import { TiDelete } from 'react-icons/ti'
import { FcStackOfPhotos } from 'react-icons/fc'
import { AiFillCheckCircle } from 'react-icons/ai'

import FilasJustificantes from "../components/FilasJustificantes/FilasJustificantes"
import Loader from '../components/Loader/Loader'
import BarraBusquedaTexto from '../components/BarraBusquedaTexto/BarraBusquedaTexto';

import Modal from '@mui/material/Modal';

import { createDatabase, deleteDatabase } from '../firebase'

import emailjs from '@emailjs/browser';

import { Toaster, toast } from 'sonner'

function TablaJustificantes(props) {
  const { justificantes } = props
  
  const [ fotoPrueba, setFotoPrueba ] = useState(false)
  const [ justificanteSeleccionado, setJustificanteSeleccionado ] = useState([])
  const [ filtrarJustificantes, setFiltrarJustificantes ] = useState(justificantes)
  const [ modalEstado, setModalEstado ] = useState(false)
  const [ palabraFiltrar, setPalabraFiltrar ] = useState('')
  const [ activarLoader, setActivarLoader ] = useState(false)

  const url = useResolvedPath("").pathname

  //Todo: Función para buscar JUSTIFICANTES por medio de nombres o apellidos
  async function busqueda(valor) {
    if(!valor) {
      setFiltrarJustificantes(justificantes)
      return
    }

    let aux = []
    for(let i = 0; i < justificantes.length; i++) {
      try {
        if(
          justificantes[i].nombreJustificante.toLowerCase().includes(valor.toLowerCase()) || 
          justificantes[i].apellidoJustificante.toLowerCase().includes(valor.toLowerCase()) ||
          justificantes[i].claveEstudianteJustificante.toLowerCase().includes(valor.toLowerCase()) ||
          justificantes[i].fechaEmisionJustificante.includes(valor) ||
          justificantes[i].fechaJustificante.includes(valor)
        ) {
          aux.push(justificantes[i])
        }
      } catch {}
    }
    setFiltrarJustificantes(aux)
  }

  async function aceptarJustificacion() {
    setActivarLoader(true)

    await deleteDatabase('justificantesEnEspera', justificanteSeleccionado.id)

    const nombreJustificante = justificanteSeleccionado.nombreJustificante
    const apellidoJustificante = justificanteSeleccionado.apellidoJustificante
    const claveEstudianteJustificante = justificanteSeleccionado.claveEstudianteJustificante
    const numeroTelefonoJustificante = justificanteSeleccionado.numeroTelefonoJustificante
    const correoJustificante = justificanteSeleccionado.correoJustificante
    const fechaInternaJustificante = justificanteSeleccionado.fechaInternaJustificante
    const fechaEmisionJustificante = justificanteSeleccionado.fechaEmisionJustificante
    const fechaJustificante = justificanteSeleccionado.fechaJustificante
    const motivoJustificante = justificanteSeleccionado.motivoJustificante
    const explicacionJustificante = justificanteSeleccionado.explicacionJustificante
    const fotoJustificante = justificanteSeleccionado.fotoJustificante
    const idFotoJustificante = justificanteSeleccionado.idFotoJustificante

    const datosMensaje = {
      nombre__alumno: `${nombreJustificante} ${apellidoJustificante}`,
      from_name: correoJustificante,
      estatus: 'ha sido aprobado.',
      fecha__emision: new Date(fechaEmisionJustificante).toLocaleDateString(),
      hora__emision: `${new Date(fechaEmisionJustificante).getHours()}:${new Date(fechaEmisionJustificante).getMinutes()}`,
      fecha__justificar: new Date(fechaJustificante).toLocaleDateString(),
      motivo__justificante: motivoJustificante,
      explicacion__justificante: explicacionJustificante
    }

    let serviceId;

    const datos = {
      nombreJustificante, 
      apellidoJustificante,
      claveEstudianteJustificante,
      numeroTelefonoJustificante,
      fechaInternaJustificante,
      fechaEmisionJustificante,
      fechaJustificante,
      motivoJustificante,
      explicacionJustificante,
      fotoJustificante,
      correoJustificante,
      idFotoJustificante
    }

    if(correoJustificante.includes('@hotmail.com')) serviceId = 'service_s03txqx'

    else if(correoJustificante.includes('@gmail.com')) serviceId = 'service_c3doz7i'

    // emailjs.send(serviceId, 'template_tje7ak6', datosMensaje, 'EjqKxLfA5pfR3G7aa')
    //   .then((result) => {
    //     console.log(result.text);
    //   }, (error) => {
    //     console.log(error.text);
    //   });

    await createDatabase('justificantesAceptados', datos)
    cambiarValor(false)
    setActivarLoader(false)
    toast.success('El Justificante ha sido aceptado con éxito.')
  }

  async function rechazarJustificacion() {
    setActivarLoader(true)

    await deleteDatabase('justificantesEnEspera', justificanteSeleccionado.id)

    const nombreJustificante = justificanteSeleccionado.nombreJustificante
    const apellidoJustificante = justificanteSeleccionado.apellidoJustificante
    const claveEstudianteJustificante = justificanteSeleccionado.claveEstudianteJustificante
    const numeroTelefonoJustificante = justificanteSeleccionado.numeroTelefonoJustificante
    const correoJustificante = justificanteSeleccionado.correoJustificante
    const fechaInternaJustificante = justificanteSeleccionado.fechaInternaJustificante
    const fechaEmisionJustificante = justificanteSeleccionado.fechaEmisionJustificante
    const fechaJustificante = justificanteSeleccionado.fechaJustificante
    const motivoJustificante = justificanteSeleccionado.motivoJustificante
    const explicacionJustificante = justificanteSeleccionado.explicacionJustificante
    const fotoJustificante = justificanteSeleccionado.fotoJustificante
    const idFotoJustificante = justificanteSeleccionado.idFotoJustificante

    const datosMensaje = {
      nombre__alumno: `${nombreJustificante} ${apellidoJustificante}`,
      from_name: correoJustificante,
      estatus: 'ha sido rechazado.',
      fecha__emision: new Date(fechaEmisionJustificante).toLocaleDateString(),
      hora__emision: `${new Date(fechaEmisionJustificante).getHours()}:${new Date(fechaEmisionJustificante).getMinutes()}`,
      fecha__justificar: new Date(fechaJustificante).toLocaleDateString(),
      motivo__justificante: motivoJustificante,
      explicacion__justificante: explicacionJustificante
    }

    let serviceId;

    const datos = {
      nombreJustificante, 
      apellidoJustificante,
      claveEstudianteJustificante,
      numeroTelefonoJustificante,
      fechaInternaJustificante,
      fechaEmisionJustificante,
      fechaJustificante,
      motivoJustificante,
      explicacionJustificante,
      fotoJustificante,
      correoJustificante,
      idFotoJustificante
    }

    if(correoJustificante.includes('@hotmail.com')) serviceId = 'service_s03txqx'

    else if(correoJustificante.includes('@gmail.com')) serviceId = 'service_c3doz7i'

    // emailjs.send(serviceId, 'template_tje7ak6', datosMensaje, 'EjqKxLfA5pfR3G7aa')
    //   .then((result) => {
    //       console.log(result.text);
    //   }, (error) => {
    //       console.log(error.text);
    //   });

    await createDatabase('justificantesRechazados', datos)
    cambiarValor(false)
    setActivarLoader(false)
    toast.success('El Justificante ha sido rechazado con éxito.')
  }

  function cambiarValor(justificante) {
    if(justificante != false) {
      setFotoPrueba(justificante.fotoJustificante)
      setJustificanteSeleccionado(justificante)
    }

    else {
      setFotoPrueba(false)
      setJustificanteSeleccionado([])
    }
  }

  useEffect(() => {
    busqueda(palabraFiltrar)
  },[palabraFiltrar, justificantes])

  return (
    <div className='container-tabla-justificantes'>
      <Toaster 
        position="top-center"
        expand={false}
        richColors
      />
      <h3 className='tabla-justificantes__titulo'>Justificantes en Espera</h3>
      <div className='contenedor__todo-final'>
        <Link to={`${url}/alumnos`} className='boton__verde-oscuro' >
          <span>Ver todos los justificantes</span>
        </Link>
      </div>
      <BarraBusquedaTexto
        titulo='Buscar Alumno'
        placeholder='Por nombre, apellido o clave de estudiante'
        valor={palabraFiltrar}
        cambiarValor={setPalabraFiltrar}
      />
      {
        fotoPrueba && (
          <div className='contenedor__todo-final contenedor__filas-centrado-vertical contenedor__padding-top'>
            <FcStackOfPhotos
              className='alumno-delete icon-alumno'
              onClick={() => setModalEstado(true)}
            />
            <AiFillCheckCircle
              className='icon-aceptar__justificante icon-alumno'
              onClick={() => aceptarJustificacion()}
            />
            <TiDelete 
              className='icon-rechazar__justificante icon-alumno'
              onClick={() => {
                  rechazarJustificacion(true)
                }
              }
            />
          </div>
        )
      }
      <div className='contenedor__tabla-scroll tamaño-tabla__350'>
        <table className='tabla'>
          <thead className='tabla-cabecera tabla-cabecera__tabla-scroll'>
              <tr>
                <th colSpan='1'>Nombre</th>
                <th colSpan='1'>Apellido</th>
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
                />
              )
            }
            </tbody>
        </table>
      </div>
      <Modal
        className='modal__superior'
        open={modalEstado}
        onClose={() => setModalEstado(false)}
      >
        <img 
          className='foto-prueba centrar__contenido' 
          src={fotoPrueba} 
          alt="Imagen del justificante"
          onClick={() => setModalEstado(false)}
        />
      </Modal>
      <Loader
        activarLoader={activarLoader}
      />
    </div>
  )
}

export default TablaJustificantes