import '../assets/css/AgregarAlumno.css'

import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'
import { IoIosAddCircle } from 'react-icons/io'
import { TiDelete } from 'react-icons/ti'

import Campo from '../components/Campo/Campo'
import CampoFecha from '../components/CampoFecha/CampoFecha'
import CampoLectura from '../components/CampoLectura/CampoLectura'
import CampoEmail from '../components/CampoEmail/CampoEmail'
import ListaOpciones from '../components/ListaOpciones/ListaOpciones'
import FotoAlumno from '../components/FotoAlumno/FotoAlumno'
import Loader from '../components/Loader/Loader'

import { parse, isBefore, diffYears } from "@formkit/tempo"

import { createStorage, deleteStorage, getURLStorage } from '../firebase'
import { updateDatabase, alumnosURL } from '../services/service-db'

import { opcionesFechasPagos, opcionesModalidades, opcionesNiveles, opcionesNivelesAcademicos } from '../utils/functions/cis'

import { Toaster, toast } from 'sonner'

function EditarAlumno(props) {
  const { idiomasImpartidos } = props

  const { 
    idAlumno, 
    asistenciasEntrada,
    justificantes,
    pagosMensualidades, 
    actualizarDatosAlumno
  } = props
  const { 
    foto,
    actaNacimiento,
    ine,
    curp,
    comprobantePagoInicial, 
    idFoto,
    idActaNacimiento,
    idIne,
    idCurp,
    idComprobantePagoInicial,
    nombre, 
    apellido, 
    numeroTelefono,
    codigoPostal,
    pais,
    estado,
    municipio,
    colonia,
    calle,
    numeroExterior,
    claveEstudiante, 
    idiomaAprendizaje, 
    modalidadEstudio, 
    fechaPago, 
    id, 
    fechaNacimiento,
    correo, 
    nivelAcademico, 
    nivelIdioma, 
    fechaIngreso,
    nombreTutor = '',
    apellidoTutor = '',
    correoTutor = '',
    numeroTelefonoTutor = ''
  } = props.datos

  const [ fotoPerfilAlumno, setFotoPerfilAlumno ] = useState(foto)
  const [ nombreAlumno, setNombreAlumno ] = useState(nombre)
  const [ apellidoAlumno, setApellidoAlumno ] = useState(apellido)
  const [ fechaNacimientoAlumno, setFechaNacimientoAlumno ] = useState(fechaNacimiento)
  const [ edadAlumno, setEdadAlumno ] = useState('')
  const [ correoAlumno, setCorreoAlumno ] = useState(correo)
  const [ numeroTelefonoAlumno, setNumeroTelefonoAlumno ] = useState(numeroTelefono)
  const [ nivelAcademicoAlumno, setNivelAcademicoAlumno ] = useState(nivelAcademico)
  const [ codigoPostalAlumno, setCodigoPostalAlumno ] = useState(codigoPostal)
  const [ paisAlumno, setPaisAlumno ] = useState(pais)
  const [ estadoAlumno, setEstadoAlumno ] = useState(estado)
  const [ municipioAlumno, setMunicipioAlumno ] = useState(municipio)
  const [ coloniaAlumno, setColoniaAlumno ] = useState(colonia)
  const [ calleAlumno, setCalleAlumno ] = useState(calle)
  const [ numeroExteriorAlumno, setNumeroExteriorAlumno ] = useState(numeroExterior)
  const [ fotoActaNacimiento, setFotoActaNacimiento ] = useState(actaNacimiento)
  const [ fotoIne, setFotoIne ] = useState(ine)
  const [ fotoCurp, setFotoCurp ] = useState(curp)
  const [ fotoComprobantePagoInicial, setFotoComprobantePagoInicial ] = useState(comprobantePagoInicial)

  const [ nombreTutorAlumno, setNombreTutorAlumno ] = useState(nombreTutor)
  const [ apellidoTutorAlumno, setApellidoTutorAlumno ] = useState(apellidoTutor)
  const [ numeroTelefonoTutorAlumno, setNumeroTelefonoTutorAlumno ] = useState(numeroTelefonoTutor)
  const [ correoTutorAlumno, setCorreoTutorAlumno ] = useState(correoTutor)

  const [ claveEstudianteAlumno, setClaveEstudianteAlumno ] = useState(claveEstudiante)
  const [ idiomaAprendizajeAlumno, setIdiomaAprendizajeAlumno ] = useState(idiomaAprendizaje)
  const [ nivelIdiomaAlumno, setNivelIdiomaAlumno ] = useState(nivelIdioma)
  const [ modalidadEstudioAlumno, setModalidadEstudioAlumno ] = useState(modalidadEstudio)
  const [ fechaIngresoAlumno, setFechaIngresoAlumno ] = useState(fechaIngreso)
  const [ fechaPagoAlumno, setFechaPagoAlumno ] = useState(fechaPago)

  const [ idFotoAlumno, setIdFotoAlumno ] = useState(idFoto)
  const [ idFotoActaNacimiento, setIdFotoActaNacimiento ] = useState(idActaNacimiento)
  const [ idFotoIne, setIdFotoIne ] = useState(idIne)
  const [ idFotoCurp, setIdFotoCurp ] = useState(idCurp)
  const [ idFotoComprobantePagoInicial, setIdFotoComprobantePagoInicial ] = useState(idComprobantePagoInicial)

  const [ fotoApoyo, setFotoApoyo ] = useState(false)
  const [ fotoApoyoActaNacimiento, setFotoApoyoActaNacimiento ] = useState(false)
  const [ fotoApoyoIne, setFotoApoyoIne ] = useState(false)
  const [ fotoApoyoCurp, setFotoApoyoCurp ] = useState(false)
  const [ fotoApoyoComprobantePagoInicial, setFotoApoyoComprobantePagoInicial ] = useState(false)

  const navigate = useNavigate()
  
  const [ activarLoader, setActivarLoader ] = useState(false)

  function agregarIdioma() {
    setIdiomaAprendizajeAlumno([...idiomaAprendizajeAlumno, ''])
    setNivelIdiomaAlumno([...nivelIdiomaAlumno, ''])
    setModalidadEstudioAlumno([...modalidadEstudioAlumno, ''])
    setFechaIngresoAlumno([...fechaIngresoAlumno, ''])
    setFechaPagoAlumno([...fechaPagoAlumno, ''])
  }

  function eliminarIdioma(index) {
    const idiomaEliminar = idiomaAprendizajeAlumno.splice(index, 1)
    const nivelIdiomaEliminar = nivelIdiomaAlumno.splice(index, 1)
    const modalidadEliminar = modalidadEstudioAlumno.splice(index, 1)
    const fechaIngresoEliminar = fechaIngresoAlumno.splice(index,1)
    const fechaPagoEliminar = fechaPagoAlumno.splice(index, 1)

    const nuevosIdiomas = idiomaAprendizajeAlumno.filter((idioma) => idioma !== idiomaEliminar)
    const nuevosNivelIdioma = nivelIdiomaAlumno.filter((nivel) => nivel !== nivelIdiomaEliminar)
    const nuevosModalidades = modalidadEstudioAlumno.filter((modalidad) => modalidad !== modalidadEliminar)
    const nuevosFechasIngreso = fechaIngresoAlumno.filter((fecha) => fecha !== fechaIngresoEliminar)
    const nuevosFechaPago = fechaPagoAlumno.filter((fecha) => fecha !== fechaPagoEliminar)

    setIdiomaAprendizajeAlumno(nuevosIdiomas)
    setNivelIdiomaAlumno(nuevosNivelIdioma)
    setModalidadEstudioAlumno(nuevosModalidades)
    setFechaIngresoAlumno(nuevosFechasIngreso)
    setFechaPagoAlumno(nuevosFechaPago)
  }
  
  function actualizarDatos(valor, index, variable, funcion) {
    let nuevosValores = variable.map((valores) => {
      return valores
    })

    const actualizados = nuevosValores.splice(index, 1, valor)
    funcion(nuevosValores)
  }

  function validarFechaNacimiento(fecha) {
    if(fecha !== '') {
      const fechaNacimiento = parse(fecha)
      const fechaActual = new Date()

      if(isBefore(fechaNacimiento, fechaActual) ) setFechaNacimientoAlumno(fecha)
      else {
        setFechaNacimientoAlumno('')
        toast.error('Fecha invalida')
      }
    }

    else setFechaNacimientoAlumno('')
  }

  async function remplazarImagen(foto, fotoApoyo) {
    if(foto && fotoApoyo) {
      const storageRef = `documentos/${idFotoActaNacimiento}`
      await deleteStorage(storageRef)
      await createStorage(storageRef, fotoActaNacimiento)

      actaNacimiento = await getURLStorage(storageRef)
    }
    else if(fotoApoyoActaNacimiento) {
      
    }
  }

  async function editarAlumnos(e) {
    e.preventDefault()

    setActivarLoader(true)

    try {

    let foto;
    const idFoto = idFotoAlumno

    let actaNacimiento;
    const idActaNacimiento = idFotoActaNacimiento

    let ine;
    const idIne = idFotoActaNacimiento

    let curp;
    const idCurp = idFotoActaNacimiento

    let comprobantePagoInicial;
    const idComprobantePagoInicial = idFotoComprobantePagoInicial

    //Todo: Foto perfil alumno
    if(fotoApoyo) {
      const storageRef = `alumnos/${idFotoAlumno}`
      await deleteStorage(storageRef)
      await createStorage(storageRef, fotoPerfilAlumno)
  
      foto = await getURLStorage(storageRef)
    }

    else if(fotoApoyo === false) {
      foto = fotoPerfilAlumno
    }

    //Todo: Foto de la acta de nacimiento
    if(fotoApoyoActaNacimiento) {
      const storageRef = `documentos/${idFotoActaNacimiento}`
      await deleteStorage(storageRef)
      await createStorage(storageRef, fotoActaNacimiento)

      actaNacimiento = await getURLStorage(storageRef)
    }

    else if(fotoApoyoActaNacimiento === false) {
      actaNacimiento = fotoActaNacimiento
    }

    //Todo: Foto de el ine
    if(fotoApoyoIne) {
      const storageRef = `documentos/${idFotoIne}`
      await deleteStorage(storageRef)
      await createStorage(storageRef, fotoIne)

      ine = await getURLStorage(storageRef)
    }

    else if(fotoApoyoIne === false) {
      ine = fotoIne
    }

    //Todo: Foto de la curp
    if(fotoApoyoCurp) {
      const storageRef = `documentos/${idFotoCurp}`
      await deleteStorage(storageRef)
      await createStorage(storageRef, fotoCurp)

      curp = await getURLStorage(storageRef)
    }

    else if(fotoApoyoCurp === false) {
      curp = fotoCurp
    }

    //Todo: Foto de el comprobante de pago inicial
    if(fotoApoyoComprobantePagoInicial) {
      const storageRef = `documentos/${idFotoComprobantePagoInicial}`
      await deleteStorage(storageRef)
      await createStorage(storageRef, fotoComprobantePagoInicial)

      comprobantePagoInicial = await getURLStorage(storageRef)
    }

    else if(fotoApoyoComprobantePagoInicial === false) {
      comprobantePagoInicial = fotoComprobantePagoInicial
    }

    const nombre = nombreAlumno
    const apellido = apellidoAlumno
    const fechaNacimiento = fechaNacimientoAlumno
    const correo = correoAlumno
    const numeroTelefono = numeroTelefonoAlumno
    const nivelAcademico = nivelAcademicoAlumno
    const codigoPostal = codigoPostalAlumno
    const pais = paisAlumno
    const estado = estadoAlumno
    const municipio = municipioAlumno
    const colonia = coloniaAlumno
    const calle = calleAlumno
    const numeroExterior = numeroExteriorAlumno
    
    const claveEstudiante = claveEstudianteAlumno
    const idiomaAprendizaje = idiomaAprendizajeAlumno
    const nivelIdioma = nivelIdiomaAlumno
    const modalidadEstudio = modalidadEstudioAlumno
    const fechaIngreso = fechaIngresoAlumno
    const fechaPago = fechaPagoAlumno

    const datos = {
      foto,
      idFoto,
      actaNacimiento,
      idActaNacimiento,
      ine,
      idIne,
      curp,
      idCurp,
      comprobantePagoInicial,
      idComprobantePagoInicial,
      nombre, 
      apellido, 
      fechaNacimiento,
      correo,
      numeroTelefono, 
      nivelAcademico,
      codigoPostal,
      pais,
      estado,
      municipio,
      colonia,
      calle,
      numeroExterior, 
      claveEstudiante,
      idiomaAprendizaje,
      nivelIdioma,
      modalidadEstudio,
      fechaIngreso,
      fechaPago
    }

    const datosAuth = {
      displayName: `${nombre} ${apellido}`,
      email: correo
    }

    updateDatabase(alumnosURL, id, {datosAuth, datos})
    .then(() => {
      actualizarDatosAlumno(false)
      setActivarLoader(false)
      toast.success('El Alumno ha sido editado con exito')
    })
    .catch(err => console.log(err))

    setTimeout(() => {
      navigate('/sistema-asistencias/panel-control/alumnos')
    }, 2000);

  } catch(error) {
      console.log(error)
      setActivarLoader(false)
    }
  }

  useEffect(() => {
    if(fechaNacimientoAlumno !== '') {
      const fechaNacimiento = parse(fechaNacimientoAlumno)
      const fechaActual = new Date()

      setEdadAlumno(diffYears(fechaActual, fechaNacimiento))
    }

    else setEdadAlumno('')
  }, [fechaNacimientoAlumno])

  return (
    <div>
      <div className="container-agregar-alumno">
        <Toaster 
          position="top-center"
          expand={false}
          richColors
        />
        <div className='contenedor__todo-principio'>
          <Link to={'/sistema-asistencias/panel-control/alumnos'}>
            <FaArrowCircleLeft className='flecha-regresar icon-40' />
          </Link>
        </div>
        <div className='agregar-alumnos__formulario'>
          <form className='formulario' onSubmit={editarAlumnos}>
            <h3 className='formulario__titulo'>Editar Alumno</h3>
            <h4 className='formulario__subtitulo'>Información Personal</h4>
            <FotoAlumno 
              titulo='Foto Perfil Alumno'
              valor={fotoPerfilAlumno}
              cambiarValor={setFotoPerfilAlumno}
              tipo={true}
              foto={fotoApoyo}
              setFoto={setFotoApoyo}
              classInput='imagen__foto-perfil-alumno'
            />
            <Campo 
              titulo='Nombre' 
              placeholder='Ingresa los nombres del alumno' 
              cambiarValor={setNombreAlumno} 
              valor={nombreAlumno}
              required
            />
            <Campo 
              titulo='Apellido' 
              placeholder='Ingresa los apellidos del alumno' 
              cambiarValor={setApellidoAlumno} 
              valor={apellidoAlumno}
              required
            />
            <CampoFecha 
              titulo='Selecciona la Fecha de Nacimiento' 
              cambiarValor={validarFechaNacimiento} 
              valor={fechaNacimientoAlumno} 
            />
            <CampoLectura 
              titulo='Edad'
              valor={edadAlumno}
              placeholder='Edad del alumno'
            />
            <CampoEmail 
              titulo='Correo Electrónico' 
              placeholder='Ingresa el correo electrónico del alumno' 
              cambiarValor={setCorreoAlumno} 
              valor={correoAlumno} 
            />
            <Campo 
              titulo='Número de Telefono' 
              placeholder='Ingresa el número de telefono del alumno' 
              cambiarValor={setNumeroTelefonoAlumno} 
              valor={numeroTelefonoAlumno} 
            />
            <ListaOpciones 
              titulo='Nivel Academico'
              placeholder='Selecciona el nivel academico del alumno'
              valor={nivelAcademicoAlumno}
              cambiarValor={setNivelAcademicoAlumno}
              opciones={opcionesNivelesAcademicos}
            />
            <Campo 
              titulo='Codigo Postal'
              placeholder='Ingresa el codigo postal del alumno'
              cambiarValor={setCodigoPostalAlumno}
              valor={codigoPostalAlumno}
            />
            <Campo 
              titulo='País'
              placeholder='Ingresa el país de donde vive el alumno'
              cambiarValor={setPaisAlumno}
              valor={paisAlumno}
            />
            <Campo 
              titulo='Estado'
              placeholder='Ingresa el estado de donde vive el alumno'
              cambiarValor={setEstadoAlumno}
              valor={estadoAlumno}
            />
            <Campo 
              titulo='Municipio/Alcaldía'
              placeholder='Ingresa el municipio de donde vive el alumno'
              cambiarValor={setMunicipioAlumno}
              valor={municipioAlumno}
            />
            <Campo
              titulo='Colonia'
              placeholder='Ingresa la colonia de donde vive el alumno'
              valor={coloniaAlumno}
              cambiarValor={setColoniaAlumno}
            />
            <Campo
              titulo='Calle'
              placeholder='Ingresa la calle de donde vive el alumno'
              valor={calleAlumno}
              cambiarValor={setCalleAlumno}
            />
            <Campo
              titulo='Número Exterior'
              placeholder='Ingresa el número exterior de donde vive el alumno'
              valor={numeroExteriorAlumno}
              cambiarValor={setNumeroExteriorAlumno}
            />
            <FotoAlumno 
              titulo='Acta de Nacimiento'
              className='foto-cuadrada'
              valor={fotoActaNacimiento}
              cambiarValor={setFotoActaNacimiento}
              tipo={true}
              foto={fotoApoyoActaNacimiento}
              setFoto={setFotoApoyoActaNacimiento}
              classInput='imagen__acta-nacimiento'
            />
            <FotoAlumno 
              titulo='Instituto Nacional Electoral (INE)'
              className='foto-cuadrada'
              valor={fotoIne}
              cambiarValor={setFotoIne}
              tipo={true}
              foto={fotoApoyoIne}
              setFoto={setFotoApoyoIne}
              classInput='imagen__ine'
            />
            <FotoAlumno 
              titulo='Curp'
              className='foto-cuadrada'
              valor={fotoCurp}
              cambiarValor={setFotoCurp}
              tipo={true}
              foto={fotoApoyoCurp}
              setFoto={setFotoApoyoCurp}
              classInput='imagen__curp'
            />
            <FotoAlumno 
              titulo='Comprobante del Pago Inicial'
              className='foto-cuadrada'
              valor={fotoComprobantePagoInicial}
              cambiarValor={setFotoComprobantePagoInicial}
              tipo={true}
              foto={fotoApoyoComprobantePagoInicial}
              setFoto={setFotoApoyoComprobantePagoInicial}
              classInput='imagen__comprobante-pago-inicial'
            />
            {
              edadAlumno !== '' && edadAlumno < 18 && (
                <>
                  <h4 className='formulario__subtitulo'>Información del Padre o Tutor</h4>
                  <Campo 
                    titulo='Nombre(s)' 
                    placeholder='Ingresa el nombre del padre o tutor del alumno' 
                    cambiarValor={setNombreTutorAlumno} 
                    valor={nombreTutorAlumno} 
                  />
                  <Campo 
                    titulo='Apellidos' 
                    placeholder='Ingresa los apellidos del padre o tutor del alumno' 
                    cambiarValor={setApellidoTutorAlumno} 
                    valor={apellidoTutorAlumno} 
                  />
                  <Campo 
                    titulo='Número de Teléfono' 
                    placeholder='Ingresa el número de teléfono del padre o tutor del alumno' 
                    cambiarValor={setNumeroTelefonoTutorAlumno} 
                    valor={numeroTelefonoTutorAlumno} 
                  />
                  <CampoEmail 
                    titulo='Correo Electrónico' 
                    placeholder='Ingresa el correo electrónico del padre o tutor del alumno' 
                    cambiarValor={setCorreoTutorAlumno} 
                    valor={correoTutorAlumno} 
                  />
                </>
              )
            }
            <h4 className='formulario__subtitulo'>Información del Centro de Idiomas</h4>
            <Campo
              titulo='Clave del Estudiante'
              placeholder='Ingresa la clave del estudiante'
              valor={claveEstudianteAlumno}
              cambiarValor={setClaveEstudianteAlumno}
              required
            />
            <div className='agregar-idiomas__icon' onClick={agregarIdioma}>
              <IoIosAddCircle />
              Agregar Formulario Sobre El Idioma
            </div>
            {
              idiomaAprendizajeAlumno.map((idioma, index) => {
                return (
                  <div className='caja__idioma-agregado' key={index}>
                    <div 
                      className='contenedor__todo-principio-centrado gap-0 pointer max-content' 
                      onClick={() => eliminarIdioma(index)}
                    >
                      <TiDelete className='idioma__icon-delete' />
                      Eliminar Formulario
                    </div>
                    <h5 className='titulos-4'>Preguntas Sobre El Idioma</h5>
                    <ListaOpciones 
                      titulo='Idioma de Aprendizaje'
                      placeholder='Ingresa el idioma de aprendizaje'
                      valor={idiomaAprendizajeAlumno[index]}
                      cambiarValor={actualizarDatos}
                      opciones={idiomasImpartidos}
                      indice={index}
                      variable={idiomaAprendizajeAlumno}
                      funcion={setIdiomaAprendizajeAlumno}
                      required
                    />
                    <ListaOpciones 
                      titulo='Nivel MCERL'
                      placeholder='Ingresa el nivel de MCERL'
                      valor={nivelIdiomaAlumno[index]}
                      cambiarValor={actualizarDatos}
                      opciones={opcionesNiveles}
                      indice={index}
                      variable={nivelIdiomaAlumno}
                      funcion={setNivelIdiomaAlumno}
                      required
                    />
                    <ListaOpciones 
                      titulo='Modalidad de Estudio'
                      placeholder='Ingresa la modalidad de estudio'
                      valor={modalidadEstudioAlumno[index]}
                      cambiarValor={actualizarDatos}
                      opciones={opcionesModalidades}
                      indice={index}
                      variable={modalidadEstudioAlumno}
                      funcion={setModalidadEstudioAlumno}
                      required
                    />
                    <CampoFecha 
                      titulo='Fecha de Ingreso'
                      valor={fechaIngresoAlumno[index]}
                      cambiarValor={actualizarDatos}
                      indice={index}
                      variable={fechaIngresoAlumno}
                      funcion={setFechaIngresoAlumno}
                      required
                    />
                    <ListaOpciones 
                      titulo='Fecha de Pago'
                      placeholder='Ingresa la fecha de pago'
                      valor={fechaPagoAlumno[index]}
                      cambiarValor={actualizarDatos}
                      opciones={opcionesFechasPagos}
                      indice={index}
                      variable={fechaPagoAlumno}
                      funcion={setFechaPagoAlumno}
                      required
                    />
                  </div>
                )
              })
            }
            <button className='boton__azul' >Editar Alumno</button>
          </form>
        </div>
      </div>
      <Loader
        activarLoader={activarLoader}
      />
    </div>
  )
}

export default EditarAlumno