
import { useState, useEffect } from 'react';

import TablaDatos from '../components/TablaDatos/TablaDatos'
import Campo from '../components/Campo/Campo'
import ListaOpciones from '../components/ListaOpciones/ListaOpciones'
import Indicadores from '../components/Indicadores/Indicadores';
import Loader from '../components/Loader/Loader'
import CampoHora from '../components/CampoHora/CampoHora';
import BarraBusquedaOpciones from '../components/BarraBusquedaOpciones/BarraBusquedaOpciones';

import { createDatabase, deleteDatabase } from '../firebase';

import dayjs from 'dayjs';

import Modal from '@mui/material/Modal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { Toaster, toast } from 'sonner'

import { v4 as uuid } from 'uuid';

function HorariosContenido(props) {
  const { idiomasImpartidos, clases, puestoAdmin } = props

  const [open, setOpen] = useState(false);
  const [ openClase, setOPenClase ] = useState(false)
  const [ claseSeleccionada, setClaseSeleccionada ] = useState([])
  const [ idClaseSeleccionada,setIdClaseSeleccionada ] = useState('')
  const [ filtrarIdiomas, setFiltrarIdiomas ] = useState(idiomasImpartidos)
  const [ idiomaSeleccionado, setIdiomaSeleccionado] = useState('General');
  const [ activarLoader, setActivarLoader ] = useState(false)

  //Todo: Estados Crear Clase
  const [ nombreClaseNuevo, setNombreClaseNuevo ] = useState('')
  const [ modalidadClaseNuevo, setModalidadClaseNuevo ] = useState('')
  const [ idiomaClaseNuevo, setIdiomaClaseNuevo ] = useState('')
  const [ horaInicioClaseNuevo, setHoraInicioClaseNuevo ] = useState(dayjs('2022-04-17T12:00'))
  const [ horaFinalClaseNuevo, setHoraFinalClaseNuevo ] = useState(dayjs('2022-04-17T12:00'))
  const [ diaLunesClase, setDiaLunesClase ] = useState(false)
  const [ diaMartesClase, setDiaMartesClase ] = useState(false)
  const [ diaMiercolesClase, setDiaMiercolesClase ] = useState(false)
  const [ diaJuevesClase, setDiaJuevesClase ] = useState(false)
  const [ diaViernesClase, setDiaViernesClase ] = useState(false)
  const [ diaSabadoClase, setDiaSabadoClase ] = useState(false)
  const [ diaDomingoClase, setDiaDomingoClase ] = useState(false)

  const opcionesModalidades = [
    'Presencial',
    'En linea'
  ]

  const opcionesDiasSemana = [
    {
      dia: 'Lunes',
      numero: 1,
      valor: diaLunesClase,
      cambiarValor: setDiaLunesClase
    },
    {
      dia: 'Martes',
      numero: 2,
      valor: diaMartesClase,
      cambiarValor: setDiaMartesClase
    },
    {
      dia: 'Miercoles',
      numero: 3,
      valor: diaMiercolesClase,
      cambiarValor: setDiaMiercolesClase
    },
    {
      dia: 'Jueves',
      numero: 4,
      valor: diaJuevesClase,
      cambiarValor: setDiaJuevesClase
    },
    {
      dia: 'Viernes',
      numero: 5,
      valor: diaViernesClase,
      cambiarValor: setDiaViernesClase
    },
    {
      dia: 'Sabado',
      numero: 6,
      valor: diaSabadoClase,
      cambiarValor: setDiaSabadoClase
    },
    {
      dia: 'Domingo',
      numero: 7,
      valor: diaDomingoClase,
      cambiarValor: setDiaDomingoClase
    }
  ]

  function actualizarDatos(clase, id) {
    setClaseSeleccionada(clase)
    setIdClaseSeleccionada(id)
  }

  //Todo: Funciones para abrir y cerrar el modal
  const handleOpen = (variable) => variable(true);
  const handleClose = (variable) => variable(false);

  function resetearClaseSeleccionada() {
    setClaseSeleccionada([])
    setIdClaseSeleccionada('')
  }

  function resetearDatosCrear() {
    setNombreClaseNuevo('')
    setModalidadClaseNuevo('')
    setIdiomaClaseNuevo('')
    setHoraInicioClaseNuevo(dayjs('2022-04-17T12:00'))
    setHoraFinalClaseNuevo(dayjs('2022-04-17T12:00'))
    setDiaLunesClase(false)
    setDiaMartesClase(false)
    setDiaMiercolesClase(false)
    setDiaJuevesClase(false)
    setDiaViernesClase(false)
    setDiaSabadoClase(false)
    setDiaDomingoClase(false)
  }

  async function busqueda(valor) {
    if(valor == 'General') {
      setFiltrarIdiomas(idiomasImpartidos)
      return
    }

    let aux = []
    for(let i = 0; i < idiomasImpartidos.length; i++) {
      try {
        if(idiomasImpartidos[i] == valor) {
          aux.push(idiomasImpartidos[i])
        }
      } catch {}
    }
    setFiltrarIdiomas(aux)
  }

  //Todo: Función para crear clases
  async function crearClase() {
    setActivarLoader(true)

    //Filtrar los nombres de los días de la clase
    const diasClaseMap = opcionesDiasSemana.map(dia => {
      if(dia.valor === true) return dia.dia
    })

    const diasClaseTexto = diasClaseMap.filter(dia => dia !== undefined)

    //Filtrar el número de los días de la clase
    const diasNumeroClaseMap = opcionesDiasSemana.map(dia => {
      if(dia.valor === true) return dia.numero
    })

    const diasNumeroClaseTexto = diasNumeroClaseMap.filter(dia => dia !== undefined)

    const claveClase = uuid()
    const nombreClase = nombreClaseNuevo
    const idiomaClase = idiomaClaseNuevo
    const modalidadClase = modalidadClaseNuevo
    const horaInicioClase = `${horaInicioClaseNuevo.$H}:${horaInicioClaseNuevo.$m}`
    const horaFinalClase = `${horaFinalClaseNuevo.$H}:${horaFinalClaseNuevo.$m}`
    const diasClase = Array.prototype.join.call(diasClaseTexto, "-")
    const diasNumeroClase = diasNumeroClaseTexto

    const datos = {
      claveClase,
      nombreClase,
      idiomaClase,
      modalidadClase,
      horaInicioClase,
      horaFinalClase,
      diasClase,
      diasNumeroClase
    }

    await createDatabase('clases', datos)
    setActivarLoader(false)
    toast.success('La Clase ha sido agregada con éxito.')
  }

  //Todo: Función para eliminar clases
  async function eliminarClase() {
    await deleteDatabase('clases', idClaseSeleccionada)
    toast.success('La Clase ha sido eliminada con éxito.')
  }

  function accesoDenegado() {
    toast.error('No tienes acceso a esta función.')
  }

  useEffect(() => {
    busqueda(idiomaSeleccionado)
  }, [idiomaSeleccionado, idiomasImpartidos])

  return (
    <div className='contenedor-horarios-contenido'>
      <Toaster 
        position="top-center"
        expand={false}
        richColors
      />
      <div>
        <h3 className='titulos-2'>Clases</h3>
        <div className='contenedor__todo-final'>
          <button 
            className='boton__verde-oscuro' 
            onClick={() => {
              puestoAdmin == 'Director'
              ? handleOpen(setOpen)
              : accesoDenegado()
            }}
          >
            Crear Clase
          </button>
        </div>
        <div className='contenedor__margin-top'>
          <BarraBusquedaOpciones
            titulo='Idioma'
            valor={idiomaSeleccionado}
            cambiarValor={setIdiomaSeleccionado}
            opciones={['General', ...idiomasImpartidos]}
          />
        </div>
        {
          filtrarIdiomas.map((idioma, index) => 
            <TablaDatos 
              key={index} 
              idioma={idioma}
              encabezados={['Número', 'Nombre', 'Días', 'Hora', 'Modalidad', 'Acciones']}
              contenidos={clases.filter(clase => clase.idiomaClase == idioma)}
              seleccionarClase={actualizarDatos}
              handleOpen={handleOpen}
              variable={setOPenClase}
              accesoDenegado={accesoDenegado}
              puestoAdmin={puestoAdmin}
            />
          )
        }
      </div>
      <Modal
        className='modal__superior'
        open={open}
        onClose={() => {
          resetearDatosCrear()
          handleClose(setOpen)
        }}
      >
        <div className='modal__por-defecto modal__contenido-2'>
          <h4 className='titulos-3'>Crear Clase</h4>
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              crearClase()
              resetearDatosCrear()
              handleClose(setOpen)
            }}
          >
            <div className='contenedor__centrado-separacion contenedor__wrap gap-x__25'>
              <div>
                <Campo 
                  className='campo-verde-claro'
                  titulo='Nombre'
                  placeholder='Ingresa el nombre'
                  cambiarValor={setNombreClaseNuevo}
                  valor={nombreClaseNuevo}
                />
                <div>
                  <h4 className='titulos-4 titulos__izquierda'>Días de la Semana</h4>
                  <FormGroup>
                    {
                      opcionesDiasSemana.map((dias, index) => 
                        <FormControlLabel 
                          key={index} 
                          control={
                            <Checkbox 
                              color="success" 
                              checked={dias.valor} 
                              onChange={(e) => dias.cambiarValor(e.target.checked)} 
                            />
                          } 
                          label={`${dias.dia}`} 
                        />
                      )
                    }
                  </FormGroup>
                </div>
              </div>
              <div>
                <ListaOpciones
                  className='lista-opciones__verde-claro'
                  titulo='Idioma'
                  placeholder='Selecciona el idioma'
                  valor={idiomaClaseNuevo}
                  cambiarValor={setIdiomaClaseNuevo}
                  opciones={idiomasImpartidos}
                />
                <ListaOpciones 
                  className='lista-opciones__verde-claro'
                  titulo='Modalidad'
                  placeholder='Selecciona la modalidad'
                  valor={modalidadClaseNuevo}
                  cambiarValor={setModalidadClaseNuevo}
                  opciones={opcionesModalidades}
                />
                <CampoHora
                  className='input-MUI__verde'
                  titulo='Inicio de Clase'
                  valor={horaInicioClaseNuevo}
                  cambiarValor={setHoraInicioClaseNuevo}
                />
                <CampoHora
                  className='input-MUI__verde'
                  titulo='Final Clase'
                  valor={horaFinalClaseNuevo}
                  cambiarValor={setHoraFinalClaseNuevo}
                />
              </div>
            </div>
            <div className='contenedor__centrado-separacion contenedor__margin-top'>
              <button 
                className='boton__blanco' 
                onClick={() => {
                  resetearDatosCrear()
                  handleClose(setOpen)
                }}
              >
                Cancelar
              </button>
              <button 
                className='boton__verde-oscuro'
              >
                Crear
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        className='modal__superior'
        open={openClase}
        onClose={() => {
          resetearClaseSeleccionada()
          handleClose(setOPenClase)
        }}
      >
        <div className='modal__por-defecto modal__contenido scroll-personalizado'>
          <h4 className='advertencia__titulo'>¡ADVERTENCIA!</h4>
          <p className='advertencia__texto'>¿Seguro qué quieres eliminar la clase?</p>
          <div className='contenedor__columna-centro'>
            <div>
              {
                claseSeleccionada.map((clase, index) => 
                  <Indicadores 
                    titulo={clase.titulo} 
                    respuesta={clase.respuesta} 
                    key={index}
                  />
                )
              }
            </div>
          </div>
          <div className='contenedor__centrado-separacion'>
            <button 
              className='boton__blanco' 
              onClick={() => {
                resetearClaseSeleccionada()
                handleClose(setOPenClase)
              }}
            >
              Cancelar
            </button>
            <button 
              className='boton__verde-oscuro'
              onClick={() => {
                eliminarClase()
                resetearClaseSeleccionada()
                handleClose(setOPenClase)
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
      <Loader
        activarLoader={activarLoader}
      />
    </div>
  )
}

export default HorariosContenido