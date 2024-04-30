

//Todo: Variable Principal
const principalURL = process.env.REACT_APP_URL_PRINCIPAL

//Todo: Variables Peticiones
export const loginURL = 'login'
export const adminsURL = 'administradores'
export const alumnosURL = 'alumnos'
export const idiomasURL = 'idiomas'
export const clasesURL = 'clases'
export const justificantesURL = 'justificantes'
export const asistenciasURL = 'asistencias'
export const pagosMensualidadURL = 'pagosMensualidades'
export const usuariosGeneralURL = 'usuarios-general'

//Todo: Funciones Database
export const createDatabase = (url, datos) => {
  const config = {
    method: 'POST', // Método de la solicitud
    headers: {
      'Content-Type': 'application/json' // Tipo de contenido que estás enviando (en este caso, JSON)
    },
    body: JSON.stringify(datos) // Convierte los datos a formato JSON
  };

  return fetch(`${principalURL}${url}`, config)
  .then(res => res.json())
  .then(res => res)
  .catch(err => err)
}

export const deleteDatabase = (url, id) => {
  const config = {
    method: 'DELETE', // Método de la solicitud
  };

  return fetch(`${principalURL}${url}/${id}`, config)
  .then(res => res.json())
  .then(res => res)
  .catch(err => err)
}

export const updateDatabase = (url, id, datos) => {
  const config = {
    method: 'PUT', // Método de la solicitud
    headers: {
      'Content-Type': 'application/json' // Tipo de contenido que estás enviando (en este caso, JSON)
    },
    body: JSON.stringify(datos) // Convierte los datos a formato JSON
  };

  return fetch(`${principalURL}${url}/${id}`, config)
  .then(res => res.json())
  .then(res => res)
  .catch(err => err)
}

//Todo: Funciones Auth
export const getUserByEmail = async(url, email) => {
  try {
    const config = {
      method: 'POST', // Método de la solicitud
      headers: {
        'Content-Type': 'application/json' // Tipo de contenido que estás enviando (en este caso, JSON)
      },
      body: JSON.stringify({email}) // Convierte los datos a formato JSON
    };
  
    const data = await fetch(`${principalURL}${url}`, config)
    const resultado = await data.json()

    if(!data.ok) {
      throw new Error(resultado.message)
    }
  
    return resultado
  } catch (error) {
    throw new Error(error.message)
  }
}

export const crearCuentasUsuarios = async (url, id, datosAuth) => {
  const config = {
    method: 'PUT', // Método de la solicitud
    headers: {
      'Content-Type': 'application/json' // Tipo de contenido que estás enviando (en este caso, JSON)
    },
    body: JSON.stringify({datosAuth}) // Convierte los datos a formato JSON
  };

  return fetch(`${principalURL}${url}/${id}`, config)
  .then(res => res.json())
  .then(res => res)
  .catch(err => err)
}

/*
  CRUD    - METODOS HTTP

  Create  - POST
  Read    - GET
  Update  - PUT/PATCH
  Delete  - DELETE
*/