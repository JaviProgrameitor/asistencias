import '../assets/css/AgregarAlumno.css'

import { useEffect, useState } from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { IoIosAddCircle } from 'react-icons/io'
import { TiDelete } from 'react-icons/ti'
import { Link } from 'react-router-dom'

import Campo from '../components/Campo/Campo'
import CampoFecha from '../components/CampoFecha/CampoFecha'
import CampoEmail from '../components/CampoEmail/CampoEmail'
import CampoLectura from '../components/CampoLectura/CampoLectura'
import ListaOpciones from '../components/ListaOpciones/ListaOpciones'
import FotoAlumno from '../components/FotoAlumno/FotoAlumno'
import CampoContrasena from '../components/CampoContrasena/CampoContrasena';
import Loader from '../components/Loader/Loader';

import { createStorage, getURLStorage } from '../firebase'
import { createDatabase, alumnosURL } from '../services/service-db'

import { Toaster, toast } from 'sonner'

import { parse, isBefore, diffYears } from "@formkit/tempo"

import { opcionesFechasPagos, opcionesModalidades, opcionesNiveles, opcionesNivelesAcademicos } from '../utils/functions/cis'

import { v4 as uuid } from 'uuid';

function AgregarAlumno(props) {
  const { alumnos, idiomasImpartidos } = props

  const [ fotoPerfilAlumno, setFotoPerfilAlumno ] = useState('')
  const [ nombreAlumno, setNombreAlumno ] = useState('')
  const [ apellidoAlumno, setApellidoAlumno ] = useState('')
  const [ fechaNacimientoAlumno, setFechaNacimientoAlumno ] = useState('')
  const [ edadAlumno, setEdadAlumno ] = useState('')
  const [ correoAlumno, setCorreoAlumno ] = useState('')
  const [ contrasenaAlumno, setContrasenaAlumno ] = useState('')
  const [ numeroTelefonoAlumno, setNumeroTelefonoAlumno ] = useState('')
  const [ nivelAcademicoAlumno, setNivelAcademicoAlumno ] = useState('')
  const [ codigoPostalAlumno, setCodigoPostalAlumno ] = useState('')
  const [ paisAlumno, setPaisAlumno ] = useState('')
  const [ estadoAlumno, setEstadoAlumno ] = useState('')
  const [ municipioAlumno, setMunicipioAlumno ] = useState('')
  const [ coloniaAlumno, setColoniaAlumno ] = useState('')
  const [ calleAlumno, setCalleAlumno ] = useState('')
  const [ numeroExteriorAlumno, setNumeroExteriorAlumno ] = useState('')
  const [ fotoActaNacimiento, setFotoActaNacimiento ] = useState('')
  const [ fotoIne, setFotoIne ] = useState('')
  const [ fotoCurp, setFotoCurp ] = useState('')
  const [ fotoComprobantePagoInicial, setFotoComprobantePagoInicial ] = useState('')

  const [ nombreTutorAlumno, setNombreTutorAlumno ] = useState('')
  const [ apellidoTutorAlumno, setApellidoTutorAlumno ] = useState('')
  const [ numeroTelefonoTutorAlumno, setNumeroTelefonoTutorAlumno ] = useState('')
  const [ correoTutorAlumno, setCorreoTutorAlumno ] = useState('')

  const [ claveEstudianteAlumno, setClaveEstudianteAlumno ] = useState('')
  const [ idiomaAprendizajeAlumno, setIdiomaAprendizajeAlumno ] = useState([''])
  const [ nivelIdiomaAlumno, setNivelIdiomaAlumno ] = useState([''])
  const [ modalidadEstudioAlumno, setModalidadEstudioAlumno ] = useState([''])
  const [ fechaIngresoAlumno, setFechaIngresoAlumno ] = useState([''])
  const [ fechaPagoAlumno, setFechaPagoAlumno ] = useState([''])

  const [ fotoApoyo, setFotoApoyo ] = useState(false)
  const [ fotoApoyoActaNacimiento, setFotoApoyoActaNacimiento ] = useState(false)
  const [ fotoApoyoIne, setFotoApoyoIne ] = useState(false)
  const [ fotoApoyoCurp, setFotoApoyoCurp ] = useState(false)
  const [ fotoApoyoComprobantePagoInicial, setFotoApoyoComprobantePagoInicial ] = useState(false)

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

  function reiniciarDatos() {
    setFotoPerfilAlumno()
    setNombreAlumno('')
    setApellidoAlumno('')
    setFechaNacimientoAlumno('')
    setCorreoAlumno('')
    setContrasenaAlumno('')
    setNumeroTelefonoAlumno('')
    setNivelAcademicoAlumno('')
    setCodigoPostalAlumno('')
    setPaisAlumno('')
    setEstadoAlumno('')
    setMunicipioAlumno('')
    setColoniaAlumno('')
    setCalleAlumno('')
    setNumeroExteriorAlumno('')
    setFotoActaNacimiento('')
    setFotoIne('')
    setFotoCurp('')
    setFotoComprobantePagoInicial('')

    setClaveEstudianteAlumno('')
    setIdiomaAprendizajeAlumno([''])
    setNivelIdiomaAlumno([''])
    setModalidadEstudioAlumno([''])
    setFechaIngresoAlumno([''])
    setFechaPagoAlumno([''])

    setFotoApoyo(false)
    setFotoApoyoActaNacimiento(false)
    setFotoApoyoIne(false)
    setFotoApoyoCurp(false)
    setFotoApoyoComprobantePagoInicial(false)
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

  async function datosEnviar(e) {
    e.preventDefault()

    const alumnoCorreo = alumnos.find((a) => a.correo === correoAlumno)
    const alumnosClaveEstudiante = alumnos.find((a) => a.claveEstudiante === claveEstudianteAlumno)
    
    if(alumnoCorreo !==  undefined) {
      toast.error('El correo electrónico ya está siendo utilizado.')
      return
    } 

    else if(alumnosClaveEstudiante !== undefined) {
      toast.error('La clave del estudiante ya está siendo utilizada.')
      return
    } 

    else {
      setActivarLoader(true)

      const identificadorAleatorio = uuid()
      const identificadorAleatorio2 = uuid()
      const identificadorAleatorio3 = uuid()
      const identificadorAleatorio4 = uuid()
      const identificadorAleatorio5 = uuid()

      const storageRef = `alumnos/${identificadorAleatorio}`
      const storageRefActa = `documentos/${identificadorAleatorio2}`
      const storageRefIne = `documentos/${identificadorAleatorio3}`
      const storageRefCurp = `documentos/${identificadorAleatorio4}`
      const storageRefComPagoIni = `documentos/${identificadorAleatorio5}`

      let foto = null;
      let actaNacimiento = null;
      let ine = null;
      let curp = null;
      let comprobantePagoInicial = null;
      
      //Validar si los documentos se ingresaron
      if(fotoPerfilAlumno){
        await createStorage(storageRef, fotoPerfilAlumno)
        foto = await getURLStorage(storageRef)
      }

      if(fotoActaNacimiento) {
        await createStorage(storageRefActa, fotoActaNacimiento)
        actaNacimiento = await getURLStorage(storageRefActa)
      }

      if(fotoIne) {
        await createStorage(storageRefIne, fotoIne)
        ine = await getURLStorage(storageRefIne)
      }

      if(fotoCurp) {
        await createStorage(storageRefCurp, fotoCurp)
        curp = await getURLStorage(storageRefCurp)
      }

      if(fotoComprobantePagoInicial) {
        await createStorage(storageRefComPagoIni, fotoComprobantePagoInicial)
        comprobantePagoInicial = await getURLStorage(storageRefComPagoIni)
      }

      const idFoto = identificadorAleatorio;
      const idActaNacimiento = identificadorAleatorio2
      const idIne = identificadorAleatorio3
      const idCurp = identificadorAleatorio4
      const idComprobantePagoInicial = identificadorAleatorio5
      const nombre = nombreAlumno
      const apellido = apellidoAlumno
      const fechaNacimiento = fechaNacimientoAlumno
      const correo = correoAlumno
      const contrasena = contrasenaAlumno
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
      const nombreTutor = nombreTutorAlumno
      const apellidoTutor = apellidoTutorAlumno
      const correoTutor = correoTutorAlumno
      const numeroTelefonoTutor = numeroTelefonoTutorAlumno
    
      const datos = {
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
        fechaPago,
        nombreTutor,
        apellidoTutor,
        correoTutor,
        numeroTelefonoTutor
      }

      const datosAuth = {
        email: correo,
        password: contrasena,
        displayName: `${nombre} ${apellido}`
      }

      createDatabase(alumnosURL, {datosAuth, datos})
      .then(() => {
        setActivarLoader(false)
        reiniciarDatos()
        toast.success('El Alumno ha sido creado con exito')
      })
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
          <form className='formulario' onSubmit={datosEnviar}>
            <h3 className='formulario__titulo'>Agregar Alumno</h3>
            <h4 className='formulario__subtitulo'>Información Personal</h4>
            <FotoAlumno 
              titulo='Foto Perfil Alumno'
              valor={fotoPerfilAlumno}
              cambiarValor={setFotoPerfilAlumno}
              tipo={false}
              foto={fotoApoyo}
              setFoto={setFotoApoyo}
              classInput='imagen__foto-perfil'
            />
            <Campo 
              titulo='Nombre(s)' 
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
            <CampoContrasena 
              titulo='Contraseña'
              placeholder='Ingresa la contraseña del alumno'
              valor={contrasenaAlumno}
              cambiarValor={setContrasenaAlumno}
            />
            <Campo 
              titulo='Número de Teléfono' 
              placeholder='Ingresa el número de teléfono del alumno' 
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
              tipo={false}
              foto={fotoApoyoActaNacimiento}
              setFoto={setFotoApoyoActaNacimiento}
              classInput='imagen__acta-nacimiento'
            />
            <FotoAlumno 
              titulo='Instituto Nacional Electoral (INE)'
              className='foto-cuadrada'
              valor={fotoIne}
              cambiarValor={setFotoIne}
              tipo={false}
              foto={fotoApoyoIne}
              setFoto={setFotoApoyoIne}
              classInput='imagen__ine'
            />
            <FotoAlumno 
              titulo='Curp'
              className='foto-cuadrada'
              valor={fotoCurp}
              cambiarValor={setFotoCurp}
              tipo={false}
              foto={fotoApoyoCurp}
              setFoto={setFotoApoyoCurp}
              classInput='imagen__curp'
            />
            <FotoAlumno 
              titulo='Comprobante del Pago Inicial'
              className='foto-cuadrada'
              valor={fotoComprobantePagoInicial}
              cambiarValor={setFotoComprobantePagoInicial}
              tipo={false}
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
              Agregar Idioma
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
            <button className='boton__azul' >Agregar Alumno</button>
          </form>
        </div>
      </div>
      <Loader
        activarLoader={activarLoader}
      />
    </div>
  )
}

export default AgregarAlumno