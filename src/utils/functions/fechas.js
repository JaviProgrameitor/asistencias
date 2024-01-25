//Variables
export const diaMilisegundos = 86400000;
export const mesMilisegundos = 2629800000;
export const diasMeses = {
  "Enero" : 31,
  "Febrero" : 28,
  "FebreroBisiesto" : 29,
  "Marzo" : 31,
  "Abril" : 30,
  "Mayo" : 31,
  "Junio" : 30,
  "Julio" : 31,
  "Agosto" : 31,
  "Septiembre" : 30,
  "Octubre" : 31,
  "Noviembre" : 30,
  "Diciembre" : 31
}

//Funciones
export function calcularNumeroPorMes(valor) {
  if(valor === 'Enero') return 0
  else if(valor === 'Febrero') return 1
  else if(valor === 'Marzo') return 2
  else if(valor === 'Abril') return 3
  else if(valor === 'Mayo') return 4
  else if(valor === 'Junio') return 5
  else if(valor === 'Julio') return 6
  else if(valor === 'Agosto') return 7
  else if(valor === 'Septiembre') return 8
  else if(valor === 'Octubre') return 9
  else if(valor === 'Noviembre') return 10
  else if(valor === 'Diciembre') return 11
}

export function calcularMesPorNumero(valor) {
  if(0 == valor) return 'Enero'
  else if(1 == valor) return 'Febrero'
  else if(2 == valor) return 'Marzo'
  else if(3 == valor) return 'Abril'
  else if(4 == valor) return 'Mayo'
  else if(5 == valor) return 'Junio'
  else if(6 == valor) return 'Julio'
  else if(7 == valor) return 'Agosto'
  else if(8 == valor) return 'Septiembre'
  else if(9 == valor) return 'Octubre'
  else if(10 == valor) return 'Noviembre'
  else if(11 == valor) return 'Diciembre'
}