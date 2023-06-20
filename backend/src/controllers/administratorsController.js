/* export const getAdmin = async (req, res) => {
  try {
    const { id, name } = req.query;
    res.status(200).json({ id, name });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}; */
import bcrypt from 'bcrypt';
import Administrator from '../models/administratorsModels.js';
import Complex from '../models/cinemaComplexModels.js';

// Obtener todos los administradores
export const getAdministrators = async (req, res) => {
  try {
    const administrators = await Administrator.find();
    res.status(200).json(administrators);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un administrador por su ID
export const obtenerAdministrador = async (req, res) => {
  try {
    const { id } = req.params;
    const administrator = await Administrator.findById(id);
    
    if (!administrator) {
      return res.status(404).json({ message: 'We cannot find the administrator you entered' });
    }

    res.status(200).json(administrator);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un administrador
export const createAdministrator = async (req, res) => {

  // validar que el complejo exista en la base de datos y recuperarlo por el nombre del complejo para hacer la relación

  const { at_complex } = req.body;
  const complex = await Complex.findOne({ name: at_complex }).exec;

  try {
    const complex = await Complex.findOne({ name: at_complex }).exec();
    if (complex) {
      const administrator = new Administrator({
        at_complex: {
          _id: complex._id,
          name: complex.name,
        },
        first_name,
        last_name,
        user_name,
        DNI,
        employee_number,
        email,
        password,
        phone_number,
        rol,
      });
  
      administrator.save()
        .then((administrator) => {
          const { _id, first_name, last_name, user_name, DNI, employee_number, email, phone_number, rol, at_complex } = administrator;
          res.status(201).json({ 
            _id,
            first_name,
            last_name,
            user_name,
            DNI,
            employee_number,
            email,
            phone_number,
            rol,
            at_complex: {
              _id: at_complex._id,
              name: at_complex.name,
            }
          });
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    } else {
      res.status(404).json({ message: 'Complex not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  

};

// Borrar un administrador por su ID
export const deleteAdministrator = async (req, res) => {
  try {
    const { id } = req.params;
    const administrator = await Administrator.findByIdAndRemove(id);
    
    if (!administrator) {
      return res.status(404).json({ message: 'We cannot find the administrator you entered' });
    }

    res.status(200).json({ message: `The administrator ${administrator.first_name} has been deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
