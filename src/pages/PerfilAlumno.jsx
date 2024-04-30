import '../assets/css/PerfilAlumno.css'

import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'

import Indicadores from '../components/Indicadores/Indicadores';
import IndicadoresMultiples from '../components/IndicadoresMultiples/IndicadoresMultiples';
import FotoDemostracion from '../components/FotoDemostracion/FotoDemostracion';
import { useEffect, useState } from 'react';

import { createQRCode } from '../services/qr-code'

import { createStorageBlob, deleteStorage, getURLStorage } from '../firebase'
import { updateDatabase, alumnosURL } from '../services/service-db'

import { v4 as uuid } from 'uuid';

import { Toaster, toast } from 'sonner'

function PerfilAlumno(props) {
  const { actualizarDatos } = props
  const { 
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
    codigoQR = false,
    idCodigoQR
  } = props.datos

  const informacionAlumno = [
    {
      titulo: 'Nombre Completo',
      valor: `${nombre} ${apellido}`
    },
    {
      titulo: 'Fecha de Nacimiento',
      valor: fechaNacimiento
    },
    {
      titulo: 'Correo',
      valor: correo
    },
    {
      titulo: 'Número Telefónico',
      valor: numeroTelefono
    },
    {
      titulo: 'Nivel Academico',
      valor: nivelAcademico
    },
    {
      titulo: 'Codigo Postal',
      valor: codigoPostal
    },
    {
      titulo: 'País',
      valor: pais
    },
    {
      titulo: 'Estado',
      valor: estado
    },
    {
      titulo: 'Municipio o Alcaldía',
      valor: municipio
    },
    {
      titulo: 'Colonia',
      valor: colonia
    },
    {
      titulo: 'Calle',
      valor: calle
    },
    {
      titulo: 'Número Exterior',
      valor: numeroExterior
    }
  ]

  const [ codigoQRLocal, setcodigoQRLocal ] = useState(codigoQR)
  const [ procesoIniciado, setProcesoIniciado ] = useState(false)

  const actualizarAlumno = async (blob) => {
    try {
      const idCodigoQR = uuid()

      const storageRef = `codigosQR/${idCodigoQR}`
      await createStorageBlob(storageRef, blob)
      const codigoQR = await getURLStorage(storageRef)

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
        fechaPago,
        codigoQR, 
        idCodigoQR
      }

      const datosAuth = {
        displayName: `${nombre} ${apellido}`,
        photoURL: foto
      }

      await updateDatabase(alumnosURL, id, {datos, datosAuth})

      return codigoQR

    } catch (error) {
      toast.error(error.message)
    }
  }

  const generateQRCode = async () => {
    try {
      setProcesoIniciado(true)
      const response = await createQRCode(claveEstudiante)
      const URL = await actualizarAlumno(response)

      setcodigoQRLocal(URL);

      setProcesoIniciado(false)
    } catch (error) {
      setProcesoIniciado(false)
      toast.error(error.message)
    }
  };

  return (
    <div>
      <Toaster 
        position="top-center"
        expand={false}
        richColors
      />
      <div className='container-perfil-alumno'>
        <div className='contenedor__todo-principio'>
          <Link to={'/sistema-asistencias/panel-control/alumnos'} onClick={() => actualizarDatos(false)}>
            <FaArrowCircleLeft className='flecha-regresar icon-40' />
          </Link>
        </div>
        <div className='justify-end mb-15'>
          <button 
            className={`${!codigoQRLocal ? 'boton__blanco' : 'boton__disabled'}`}
            disabled={codigoQRLocal}
            onClick={generateQRCode}
          >
            {
              !procesoIniciado
                ? 'Generar Código QR'
                : <span className='element-loader'></span>
            }
          </button>
        </div>
        <div className='perfil-alumno__personal'>
          <div className='contenedor-_foto-alumno'>
            <div className='personal__fondo'>
              <img className='perfil-foto-alumno' src={foto} alt="Foto de Perfil del Alumno" />
            </div>
          </div>
          <h2 className='titulos-2'>Información Personal</h2>
          <div>
            {
              informacionAlumno.map((info, index) => 
                <Indicadores 
                  titulo={info.titulo} 
                  respuesta={info.valor} 
                  key={index} 
                />
              )
            }
          </div>
        </div>
        <div className='perfil-alumno__centro-idiomas'>
          <h2 className='titulos-2'>Información Centro de Idiomas</h2>
          <div>
            <Indicadores 
              titulo={'Clave del Estudiante'} 
              respuesta={claveEstudiante} 
            />
            <IndicadoresMultiples 
              titulo={'Idiomas de Aprendizaje'} 
              respuesta={idiomaAprendizaje} 
            />
            <IndicadoresMultiples 
              titulo={'Nivel MCERLC'} 
              respuesta={nivelIdioma} 
            />
            <IndicadoresMultiples 
              titulo={'Modalidad de Estudio'} 
              respuesta={modalidadEstudio} 
            />
            <IndicadoresMultiples 
              titulo={'Fecha de Ingreso'} 
              respuesta={fechaIngreso} 
            />
            <IndicadoresMultiples 
              titulo={'Fecha de Pago'} 
              respuesta={fechaPago} 
            />
          </div>
        </div>
        <div className='contenedor__columna-centro'>
          <h2 className="titulos-2">Documentos</h2>
          <div className='contenedor__presentacion-documentos'>
            <FotoDemostracion 
              alumno={nombre}
              imagen={actaNacimiento}
              documento='Acta de Nacimiento'
              nombreDocumento={`Acta-nacimiento__${nombre}`}
            />
            <FotoDemostracion 
              alumno={nombre}
              imagen={ine}
              documento='Ine'
              nombreDocumento={`Ine__${nombre}`}
            />
            <FotoDemostracion 
              alumno={nombre}
              imagen={curp}
              documento='Curp'
              nombreDocumento={`Curp__${nombre}`}
            />
            <FotoDemostracion 
              alumno={nombre}
              imagen={comprobantePagoInicial}
              documento='Comprobante de Pago Inicial'
              nombreDocumento={`Comprobante-pago-inicial__${nombre}`}
            />
            {
              codigoQRLocal && (
                <FotoDemostracion 
                  alumno={nombre}
                  imagen={codigoQRLocal}
                  documento='Código QR'
                  nombreDocumento={`Comprobante-pago-inicial__${nombre}`}
                />
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfilAlumno