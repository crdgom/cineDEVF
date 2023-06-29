import jwt_decode from 'jwt-decode'
import { createContext, useEffect, useState, useContext } from 'react'

const AuthContext = createContext()

const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false) // ¿Está autenticado?
  const [userPayload, setUserPayload] = useState(null) // Datos del usuario

  const login = (token) => {
    // Guardar el token en el localStorage
    window.localStorage.setItem('token', token)
    // Decodificar el token
    const decode = jwt_decode(token)
    // Guardar el payload en el estado
    setUserPayload(decode)
    // Cambiar el estado de autenticación
    setIsAuth(true)
  }

  const logout = () => {
    // Eliminar el token del localStorage
    window.localStorage.removeItem('token')
    // Eliminar el payload del estado
    setUserPayload(null)
    // Cambiar el estado de autenticación
    setIsAuth(false)
  }

  useEffect(() => {
    // recuperar el token si existe en el localStorage
    const token = window.localStorage.getItem('token')
    // si existe el token
    if (token) {
      // decodificar el token
      const decode = jwt_decode(token)
      // guardar el payload en el estado
      setUserPayload(decode)
      // cambiar el estado de autenticación
      setIsAuth(true)
    }
  }, [])

  const values = {
    // exportar los valores del contexto
    login,
    logout,
    isAuth,
    userPayload

  }

  return (
    <AuthContext.Provider value={values} {...props} />
  )
}

const useAuthContext = () => {
  const context = useContext(AuthContext)
  return context
}

export {
  AuthContext,
  AuthProvider,
  useAuthContext
}