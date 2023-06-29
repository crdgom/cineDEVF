import Jwt from 'jsonwebtoken';
import 'dotenv/config.js'

// Middleware de autenticación y autorización de administradores
const isAdmin = (req, res, next) => {
  // Obtener el token de autorización del encabezado de la solicitud
  const token = req.headers.authorization;

  // Verificar si el token está presente
  if (!token) {
    return res.status(401).json({ message: 'Token de autorización no proporcionado' });
  }

  try {
    // Verificar y decodificar el token
    const decodedToken = Jwt.verify(token, process.env.ADMINS_SECRET);

    console.log(token)
    console.log('---- decodedToken ----')
    console.log(decodedToken);
    console.log(decodedToken.rol)

    // Verificar si el rol del usuario es 'admin'
    if (decodedToken.rol === 'admin') {
      // El usuario es administrador, permitir el acceso a la ruta
      next();
    } else {
      // El usuario no tiene permisos de administrador, denegar el acceso
      return res.status(403).json({ message: 'Acceso denegado. Usted no tiene los permisos necesarios' });
    }
  } catch (error) {
    // Error al verificar el token, denegar el acceso
    return res.status(401).json({ message: 'Token de autorización inválido' });
  }
};

export default isAdmin;
