import '../assets/css/AgregarAlumno.css'

import { useState } from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { IoIosAddCircle } from 'react-icons/io'
import { TiDelete } from 'react-icons/ti'
import { Link } from 'react-router-dom'


import Campo from '../components/Campo/Campo'
import CampoFecha from '../components/CampoFecha/CampoFecha'
import CampoEmail from '../components/CampoEmail/CampoEmail'
import ListaOpciones from '../components/ListaOpciones/ListaOpciones'
import FotoAlumno from '../components/FotoAlumno/FotoAlumno'
import CampoContrasena from '../components/CampoContrasena/CampoContrasena'
import CampoAutocompletar from '../components/CampoAutocompletar/CampoAutocompletar'

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { addDoc, collection, getFirestore  } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import firebaseConfig from '../firebase';

import { Toaster, toast } from 'sonner'

import { v4 as uuid } from 'uuid';



function AgregarAlumno(props) {
  const { alumnos } = props

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const st = getStorage(app);
  const auth = getAuth()

  const [ fotoPerfilAlumno, setFotoPerfilAlumno ] = useState()
  const [ nombreAlumno, setNombreAlumno ] = useState('')
  const [ apellidoAlumno, setApellidoAlumno ] = useState('')
  const [ fechaNacimientoAlumno, setFechaNacimientoAlumno ] = useState('')
  const [ generoAlumno, setGeneroAlumno ] = useState('')
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
    'En linea',
    'Mixto'
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

  const opcionesGenero = [
    'Hombre',
    'Mujer'
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

  function asignarValor(valor) {
    setMunicipioAlumno('')
    valor === null ? setEstadoAlumno('') : setEstadoAlumno(valor)
  }

  async function datosEnviar(e) {
    e.preventDefault()

    const alumnosIns = alumnos.filter((al) => al.correo === correoAlumno)

    if(alumnosIns.length <= 0) {
      const identificadorAleatorio = uuid()
      const identificadorAleatorio2 = uuid()
      const identificadorAleatorio3 = uuid()
      const identificadorAleatorio4 = uuid()
      const identificadorAleatorio5 = uuid()

      const metadata = {contentType: fotoPerfilAlumno.type};
      const storageRef = ref(st, `alumnos/${identificadorAleatorio}`)
      await uploadBytesResumable(storageRef, fotoPerfilAlumno, metadata)

      const metadataActa = {contentType: fotoActaNacimiento.type};
      const storageRefActa = ref(st, `documentos/${identificadorAleatorio2}`)
      await uploadBytesResumable(storageRefActa, fotoActaNacimiento, metadataActa)

      const metadataIne = {contentType: fotoIne.type};
      const storageRefIne = ref(st, `documentos/${identificadorAleatorio3}`)
      await uploadBytesResumable(storageRefIne, fotoIne, metadataIne)

      const metadataCurp = {contentType: fotoCurp.type};
      const storageRefCurp = ref(st, `documentos/${identificadorAleatorio4}`)
      await uploadBytesResumable(storageRefCurp, fotoCurp, metadataCurp)

      const metadataComPagoIni = {contentType: fotoComprobantePagoInicial.type};
      const storageRefComPagoIni = ref(st, `documentos/${identificadorAleatorio5}`)
      await uploadBytesResumable(storageRefComPagoIni, fotoComprobantePagoInicial, metadataComPagoIni)
  
      const foto = await getDownloadURL(storageRef)
      const actaNacimiento = await getDownloadURL(storageRefActa)
      const ine = await getDownloadURL(storageRefIne)
      const curp = await getDownloadURL(storageRefCurp)
      const comprobantePagoInicial = await getDownloadURL(storageRefComPagoIni)
      const idFoto = identificadorAleatorio;
      const idActaNacimiento = identificadorAleatorio2
      const idIne = identificadorAleatorio3
      const idCurp = identificadorAleatorio4
      const idComprobantePagoInicial = identificadorAleatorio5
      const nombre = nombreAlumno
      const apellido = apellidoAlumno
      const fechaNacimiento = fechaNacimientoAlumno
      const genero = generoAlumno
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
        genero,
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
  
      const collectionRef = collection(db, 'alumnos')
      const docRef = await addDoc(collectionRef, datos)
      toast.success('El Alumno ha sido creado con exito')
    }

    else toast.error('El correo electrónico ya ha sido utilizado.')
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
          <Link to={'/panel-control/alumnos'}><FaArrowCircleLeft className='flecha-regresar icon-40' /></Link>
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
              required={true}
              classInput='imagen__foto-perfil'
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
            <ListaOpciones 
              titulo='Género'
              placeholder='Selecciona el género del alumno'
              valor={generoAlumno}
              cambiarValor={setGeneroAlumno}
              opciones={opcionesGenero}
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
              tipo={false}
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
              tipo={false}
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
              tipo={false}
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
              tipo={false}
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
            <IoIosAddCircle className='agregar-idiomas__icon' onClick={agregarIdioma} />
            {
              idiomaAprendizajeAlumno.map((idioma, index) => {
                return (
                  <div key={index}>
                    <TiDelete className='idioma__icon-delete' onClick={() => eliminarIdioma(index)} />
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
                      titulo='Nivel MCERLC'
                      placeholder='Ingresa el nivel de MCERLC'
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
            <button className='boton__azul' >Agregar Alumno</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AgregarAlumno