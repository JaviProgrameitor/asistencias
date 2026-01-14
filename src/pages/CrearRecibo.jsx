import '../assets/css/CrearRecibo.css'

import { useEffect, useState } from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link } from "react-router-dom"
import { TiDelete } from 'react-icons/ti'

import Campo from '../components/Campo/Campo'
import CampoAutocompletar from '../components/CampoAutocompletar/CampoAutocompletar';
import ReciboPago from '../components/ReciboPago/ReciboPago';
import { Modal } from '@mui/material';

const conceptosPorDefecto = [
  'Inversión mensual',
  'Inscripción',
]

const idiomasDisponibles = [
  {
    name: 'Español',
    code: 'Española'
  },
  {
    name: 'Inglés',
    code: 'Inglesa'
  },
  {
    name: 'Francés',
    code: 'Francesa'
  }
]

function CrearRecibo({ alumnos }) {
  const [numeroReferencia, setNumeroReferencia] = useState('')
  const [personaPago, setPersonaPago] = useState('')
  const [lengua, setLengua] = useState('Inglesa')
  const [modalidad, setModalidad] = useState('')
  const [cantidadPagadaNumero, setCantidadPagadaNumero] = useState('')
  const [alumnoPago, setAlumnoPago] = useState(null)
  const [listaAlumnosPago, setListaAlumnosPago] = useState([])
  const [fechaRecibo, setFechaRecibo] = useState('')
  const [concepto, setConcepto] = useState('Inversión mensual')

  const [estadoModalRecibo, setEstadoModalRecibo] = useState(false)

  function listarAlumnos() {
    if (alumnoPago != null) setListaAlumnosPago([...listaAlumnosPago, alumnoPago])
  }

  function desListarAlumnos(index) {
    const nuevaLista = listaAlumnosPago.toSpliced(index, 1)

    setListaAlumnosPago(nuevaLista)
  }

  function numeroALetras(num) {
    const unidades = [
      '', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis',
      'siete', 'ocho', 'nueve', 'diez', 'once', 'doce',
      'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete',
      'dieciocho', 'diecinueve', 'veinte'
    ];
    const decenas = [
      '', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta',
      'sesenta', 'setenta', 'ochenta', 'noventa'
    ];
    const centenas = [
      '', 'cien', 'doscientos', 'trescientos', 'cuatrocientos',
      'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'
    ];

    if (typeof num !== 'number' || num < 0 || num > 1000000)
      return 'Número fuera de rango';

    if (num === 0) return 'Cero';

    function convertirMenorMil(n) {
      let palabras = '';
      if (n > 99) {
        if (n === 100) return 'cien';
        palabras += centenas[Math.floor(n / 100)] + ' ';
        n %= 100;
      }
      if (n > 20) {
        palabras += decenas[Math.floor(n / 10)];
        if (n % 10 !== 0) palabras += ' y ' + unidades[n % 10];
      } else if (n > 0) {
        palabras += unidades[n];
      }
      return palabras.trim();
    }

    let resultado = '';

    if (num === 1000000) {
      resultado = 'Un millón';
    } else {
      const miles = Math.floor(num / 1000);
      const resto = num % 1000;

      if (miles > 0) {
        if (miles === 1) {
          resultado += 'Un mil ';
        } else {
          resultado += convertirMenorMil(miles) + ' mil ';
        }
      }
      if (resto > 0) {
        resultado += convertirMenorMil(resto);
      }
    }

    // Primer letra en mayúscula
    resultado = resultado.trim();
    if (resultado.length > 0) {
      resultado = resultado[0].toUpperCase() + resultado.slice(1);
    }
    return resultado;
  }

  function formatearNumero(num) {
    if (typeof num !== "number" || isNaN(num)) return "Valor inválido";

    // Usa toLocaleString para formato local
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    });
  }


  useEffect(listarAlumnos, [alumnoPago])

  return (
    <div>
      <div className='contenedor__todo-principio'>
        <Link to={'/sistema-asistencias/panel-control/alumnos/pagos-alumnos'}>
          <FaArrowCircleLeft className='flecha-regresar icon-40' />
        </Link>
      </div>
      <div className='agregar-alumnos__formulario'>
        <div className='formulario'>
          <h4 className="formulario__titulo">Crear Recibo</h4>
          <Campo
            titulo='Fecha del Recibo'
            placeholder='Ingresa la fecha del recibo'
            valor={fechaRecibo}
            cambiarValor={setFechaRecibo}
          />
          <Campo
            titulo='Número de Referencia'
            placeholder='Ingresa el número de referencia'
            valor={numeroReferencia}
            cambiarValor={setNumeroReferencia}
          />
          <Campo
            titulo='Entregada por'
            placeholder='Ingresa el nombre'
            valor={personaPago}
            cambiarValor={setPersonaPago}
          />
          <div className='campo'>
            <label htmlFor="lengua">Lengua</label>
            <select id="lengua" value={lengua} onChange={e => setLengua(e.target.value)}>
              {
                idiomasDisponibles.map((idioma, index) =>
                  <option
                    key={index}
                    value={idioma.code}
                  >
                    {idioma.name}
                  </option>
                )
              }
            </select>
          </div>
          <Campo
            titulo='Modalidad'
            placeholder='Ingresa la modalidad'
            valor={modalidad}
            cambiarValor={setModalidad}
          />
          <Campo
            titulo='Cantidad Pagada'
            placeholder='Ingresa la cantidad'
            valor={cantidadPagadaNumero}
            cambiarValor={setCantidadPagadaNumero}
          />
          <div className='campo'>
            <label htmlFor="concepto">Concepto</label>
            <select id="concepto" value={concepto} onChange={e => setConcepto(e.target.value)}>
              {conceptosPorDefecto.map((concepto, index) =>
                <option
                  key={index}
                  value={concepto}
                >
                  {concepto}
                </option>
              )
              }
            </select>
          </div>
          <CampoAutocompletar
            titulo='Alumnos'
            placeholder='Selecciona los alumnos'
            valor={alumnoPago}
            cambiarValor={setAlumnoPago}
            opciones={alumnos}
            variante='standard'
          />
          <div>
            {
              listaAlumnosPago.length >= 1
                ? <>
                  <h3>Alumnos Seleccionados</h3>
                  <ul>
                    {
                      listaAlumnosPago.map((alumno, index) =>
                        <li
                          key={index}
                        >
                          <div className='contenedor__todo-principio-centrado'>
                            {alumno}
                            <TiDelete
                              className='idioma__icon-delete pointer'
                              onClick={e => desListarAlumnos(index)}
                            />
                          </div>
                        </li>
                      )
                    }
                  </ul>
                </>
                : <p>No hay alumnos seleccionados</p>
            }
          </div>
          <button
            className='boton__azul boton__desktop'
            onClick={() => setEstadoModalRecibo(true)}
          >
            Descargar PDF
          </button>
        </div>
      </div>
      <Modal
        className='modal__superior contenedor__ambos-lados_centrado'
        open={estadoModalRecibo}
        onClose={() => setEstadoModalRecibo(false)}
      >
        <ReciboPago
          numeroReferencia={numeroReferencia}
          personaPago={personaPago}
          listaAlumnosPago={listaAlumnosPago}
          lengua={lengua}
          modalidad={modalidad}
          cantidadPagadaNumero={formatearNumero(Number(cantidadPagadaNumero))}
          cantidadPagadaEscrita={numeroALetras(Number(cantidadPagadaNumero))}
          fechaRecibo={fechaRecibo}
          concepto={concepto}
        />
      </Modal>
    </div>
  )
}

export default CrearRecibo