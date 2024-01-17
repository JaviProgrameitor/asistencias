import '../assets/css/AgregarAlumno.css'

import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'
import { IoIosAddCircle } from 'react-icons/io'
import { TiDelete } from 'react-icons/ti'

import Campo from '../components/Campo/Campo'
import CampoFecha from '../components/CampoFecha/CampoFecha'
import CampoEmail from '../components/CampoEmail/CampoEmail'
import ListaOpciones from '../components/ListaOpciones/ListaOpciones'
import FotoAlumno from '../components/FotoAlumno/FotoAlumno'
import Loader from '../components/Loader/Loader'

import { updateDatabase, createStorage, deleteStorage, getURLStorage } from '../firebase'

import { Toaster, toast } from 'sonner'

function EditarAlumno(props) {
  const { 
    idAlumno, 
    asistenciasEntrada, 
    justificantesAceptados, 
    justificantesEnEspera, 
    justificantesRechazados, 
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
    contrasena,
    nivelAcademico, 
    nivelIdioma, 
    fechaIngreso 
  } = props.datos

  const [ fotoPerfilAlumno, setFotoPerfilAlumno ] = useState(foto)
  const [ nombreAlumno, setNombreAlumno ] = useState(nombre)
  const [ apellidoAlumno, setApellidoAlumno ] = useState(apellido)
  const [ fechaNacimientoAlumno, setFechaNacimientoAlumno ] = useState(fechaNacimiento)
  const [ correoAlumno, setCorreoAlumno ] = useState(correo)
  const [ contrasenaAlumno, setContrasenaAlumno ] = useState(contrasena)
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

  const opcionesNivelesAcademicos = [
    'Primaria',
    'Secundaria',
    'Bachillerato',
    'Educación Superior'
  ]

  const opcionesIdiomas = [
    'Inglés',
    'Francés',
    'Aleman'
  ]

  const opcionesModalidades = [
    'Presencial',
    'En linea'
  ]

  const opcionesNiveles = [
    'A1',
    'A2',
    'B1',
    'B2',
    'C1',
    'C2'
  ]

  const opcionesFechasPagos = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ]

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

  async function editarAlumnos(e) {
    e.preventDefault()

    setActivarLoader(true)

    try {

    let foto;
    let idFoto;

    let actaNacimiento;
    let idActaNacimiento;

    let ine;
    let idIne;

    let curp;
    let idCurp;

    let comprobantePagoInicial;
    let idComprobantePagoInicial;

    //Todo: Foto perfil alumno
    if(fotoApoyo) {
      const storageRef = `alumnos/${idFotoAlumno}`
      await deleteStorage(storageRef)
      await createStorage(storageRef, fotoPerfilAlumno)
  
      foto = await getURLStorage(storageRef)
      idFoto = idFotoAlumno
    }

    else if(fotoApoyo === false) {
      foto = fotoPerfilAlumno
      idFoto = idFotoAlumno
    }

    //Todo: Foto de la acta de nacimiento
    if(fotoApoyoActaNacimiento) {
      const storageRef = `documentos/${idFotoActaNacimiento}`
      await deleteStorage(storageRef)
      await createStorage(storageRef, fotoActaNacimiento)

      actaNacimiento = await getURLStorage(storageRef)
      idActaNacimiento = idFotoActaNacimiento
    }

    else if(fotoApoyoActaNacimiento === false) {
      actaNacimiento = fotoActaNacimiento
      idActaNacimiento = idFotoActaNacimiento
    }

    //Todo: Foto de el ine
    if(fotoApoyoIne) {
      const storageRef = `documentos/${idFotoIne}`
      await deleteStorage(storageRef)
      await createStorage(storageRef, fotoIne)

      ine = await getURLStorage(storageRef)
      idIne = idFotoIne
    }

    else if(fotoApoyoIne === false) {
      ine = fotoIne
      idIne = idFotoIne
    }

    //Todo: Foto de la curp
    if(fotoApoyoCurp) {
      const storageRef = `documentos/${idFotoCurp}`
      await deleteStorage(storageRef)
      await createStorage(storageRef, fotoCurp)

      curp = await getURLStorage(storageRef)
      idCurp = idFotoCurp
    }

    else if(fotoApoyoCurp === false) {
      curp = fotoCurp
      idCurp = idFotoCurp
    }

    //Todo: Foto de el comprobante de pago inicial
    if(fotoApoyoComprobantePagoInicial) {
      const storageRef = `documentos/${idFotoComprobantePagoInicial}`
      await deleteStorage(storageRef)
      await createStorage(storageRef, fotoComprobantePagoInicial)

      comprobantePagoInicial = await getURLStorage(storageRef)
      idComprobantePagoInicial = idFotoComprobantePagoInicial
    }

    else if(fotoApoyoComprobantePagoInicial === false) {
      comprobantePagoInicial = fotoComprobantePagoInicial
      idComprobantePagoInicial = idFotoComprobantePagoInicial
    }

    //Todo: Editar el nombre, apellido y clave de estudiante de las asistencias del alumno
    for(let i = 0; i < asistenciasEntrada.length; i++) {
      let {
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
        id
      } = asistenciasEntrada[i]

      nombreAsistenciaEntrada = nombreAlumno
      apellidoAsistenciaEntrada = apellidoAlumno
      claveEstudianteAsistenciaEntrada = claveEstudianteAlumno

      const datos = {
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
        idiomaAsistenciaEntrada
      }

      await updateDatabase('asistenciasEntrada', id, datos)
    }

    //Todo: Editar el nombre, apellido y clave de estudiante de los justificantes en espera del alumno
    for(let i = 0; i < justificantesEnEspera.length; i++) {
      let {
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
        idFotoJustificante,
        id
      } = justificantesEnEspera[i]

      nombreJustificante = nombreAlumno
      apellidoJustificante = apellidoAlumno
      claveEstudianteJustificante = claveEstudianteAlumno

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

      await updateDatabase('justificantesEnEspera', id, datos)
    }

    //Todo: Editar el nombre, apellido y clave de estudiante de los justificantes aceptados del alumno
    for(let i = 0; i < justificantesAceptados.length; i++) {
      let {
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
        idFotoJustificante,
        id
      } = justificantesAceptados[i]

      nombreJustificante = nombreAlumno
      apellidoJustificante = apellidoAlumno
      claveEstudianteJustificante = claveEstudianteAlumno

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

      await updateDatabase('justificantesAceptados', id, datos)
    }

    //Todo: Editar el nombre, apellido y clave de estudiante de los justificantes rechazados del alumno
    for(let i = 0; i < justificantesRechazados.length; i++) {
      let {
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
        idFotoJustificante,
        id
      } = justificantesRechazados[i]

      nombreJustificante = nombreAlumno
      apellidoJustificante = apellidoAlumno
      claveEstudianteJustificante = claveEstudianteAlumno

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

      await updateDatabase('justificantesRechazados', id, datos)
    }

    //Todo: Editar el nombre, apellido y clave de estudiante de los pagos mensuales
    for(let i = 0; i < pagosMensualidades.length; i++) {
      let {
        comprobantePagoMensualidad,
        idComprobantePagoMensualidad,
        nombrePago,
        apellidoPago,
        claveEstudiantePago,
        idiomaPago,
        inicioMensualidad,
        fechaInternaDiaPago,
        diaPago,
        finalMensualidad,
        id
      } = pagosMensualidades[i]

      nombrePago = nombreAlumno
      apellidoPago = apellidoAlumno
      claveEstudiantePago = claveEstudianteAlumno

      const datos = {
        comprobantePagoMensualidad,
        idComprobantePagoMensualidad,
        nombrePago,
        apellidoPago,
        claveEstudiantePago,
        idiomaPago,
        inicioMensualidad,
        fechaInternaDiaPago,
        diaPago,
        finalMensualidad
      }

      await updateDatabase('pagosMensualidades', id, datos)
    }

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
      contrasena,
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

    await updateDatabase('alumnos', idAlumno, datos)

    actualizarDatosAlumno(false)
    setActivarLoader(false)
    toast.success('El Alumno ha sido editado con exito')

    setTimeout(() => {
      navigate('/sistema-asistencias/panel-control/alumnos')
    }, 2000);

  } catch(error) {
      console.log(error)
      setActivarLoader(false)
    }
  }

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
              required={false}
              classInput='imagen__foto-perfil-alumno'
            />
            <Campo 
              titulo='Nombre' 
              placeholder='Ingresa los nombres del alumno' 
              cambiarValor={setNombreAlumno} 
              valor={nombreAlumno} 
            />
            <Campo 
              titulo='Apellido' 
              placeholder='Ingresa los apellidos del alumno' 
              cambiarValor={setApellidoAlumno} 
              valor={apellidoAlumno} 
            />
            <CampoFecha 
              titulo='Selecciona la Fecha de Nacimiento' 
              cambiarValor={setFechaNacimientoAlumno} 
              valor={fechaNacimientoAlumno} 
            />
            <CampoEmail 
              titulo='Correo Electronico' 
              placeholder='Ingresa el correo electronico del alumno' 
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
              required={false}
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
              required={false}
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
              required={false}
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
              required={false}
              classInput='imagen__comprobante-pago-inicial'
            />
            <h4 className='formulario__subtitulo'>Información del Centro de Idiomas</h4>
            <Campo
              titulo='Clave del Estudiante'
              placeholder='Ingresa la clave del estudiante'
              valor={claveEstudianteAlumno}
              cambiarValor={setClaveEstudianteAlumno}
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
                      opciones={opcionesIdiomas}
                      indice={index}
                      variable={idiomaAprendizajeAlumno}
                      funcion={setIdiomaAprendizajeAlumno}
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
                    />
                    <CampoFecha 
                      titulo='Fecha de Ingreso'
                      valor={fechaIngresoAlumno[index]}
                      cambiarValor={actualizarDatos}
                      indice={index}
                      variable={fechaIngresoAlumno}
                      funcion={setFechaIngresoAlumno}
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