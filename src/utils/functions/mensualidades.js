import { diasMeses, mesMilisegundos ,calcularMesPorNumero, calcularNumeroPorMes } from "./fechas";

//Variables
export const coloresAlumno = {
  colorFondoCercaPago: 'cerca-pago',
  colorFondoPago: 'dia-pago',
  colorFondoDeuda: 'deudas',
  colorFondoSinDeudas: 'sin-deudas'
}

//Funciones
export function calcularFinMensualidad(tipoRespuesta, fecha, mes, año) {
  let fechaActual = new Date(`${mes} 15, ${año}`).getTime()
  let nuevaFecha = new Date(fechaActual + mesMilisegundos)

  let mesFinal = nuevaFecha.getMonth() + 1
  let nombreMesFinal = calcularMesPorNumero(mesFinal -  1)
  let añoFinal = nuevaFecha.getFullYear()
  let fechaFinal = diasMeses[nombreMesFinal] < parseInt(fecha) ? diasMeses[nombreMesFinal] : fecha

  if(tipoRespuesta == "string") return `${fechaFinal}/${mesFinal}/${añoFinal}`
  else if(tipoRespuesta == "objeto") return [fechaFinal, calcularNumeroPorMes(mesFinal), añoFinal]
}

export function calcularAnteriorMensualidad(tipoRespuesta, fecha, mes, año) {
  let fechaActual = new Date(`${mes} 15, ${año}`).getTime()
  let nuevaFecha = new Date(fechaActual - mesMilisegundos)

  let mesFinal = nuevaFecha.getMonth() + 1
  let nombreMesFinal = calcularMesPorNumero(mesFinal -  1)
  let añoFinal = nuevaFecha.getFullYear()
  let fechaFinal = diasMeses[nombreMesFinal] < parseInt(fecha) ? diasMeses[nombreMesFinal] : fecha

  if(tipoRespuesta == "string") return `${fechaFinal}/${mesFinal}/${añoFinal}`
  else if(tipoRespuesta == "objeto") return [fechaFinal, calcularNumeroPorMes(nombreMesFinal), añoFinal]
}