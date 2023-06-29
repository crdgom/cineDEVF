import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js'
import Employee from '../models/employeesModels.js';
import Complex from '../models/cinemaComplexModels.js';

// Obtener todos los empleados
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un empleado por su ID
export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employee.findById(id);
    
    if (!employee) {
      return res.status(404).json({ message: 'We cannot find the employee you entered' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un empleado
export const createEmployee = async (req, res) => {
    const { first_name, last_name, user_name, DNI, employee_number, email, password, phone_number, rol } = req.body;
    const { at_complex } = req.body;
    const complex = await Complex.findOne({ complex_name: at_complex }).exec();
    
    try {
      if (complex) {
        const newEmployee = new Employee({
          at_complex: {
            _id: complex._id,
            complex_name: complex.name,
          },
          first_name,
          last_name,
          user_name,
          DNI,
          employee_number,
          email,
          password: bcrypt.hashSync(password, 10),
          phone_number,
          rol,
        });
    
        newEmployee.save()
          .then((employee) => {
            const { _id, first_name, last_name, user_name, DNI, employee_number, email, phone_number, rol, at_complex } = employee;
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
                complex_name: at_complex.name,
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
  


// Actualizar un empleado por su ID
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { at_complex, first_name, last_name, user_name, DNI, employee_number, email, phone_number, rol } = req.body;
    const complex = await Complex.findOne({ name: at_complex }).exec();

    if (complex) {
      const employee = await Employee.findByIdAndUpdate(id, {
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
        phone_number,
        rol,
      }, { new: true });

      if (!employee) {
        return res.status(404).json({ message: 'We cannot find the employee you entered' });
      }

      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: 'Complex not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Borrar un empleado por su ID
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndRemove(id);
    
    if (!employee) {
      return res.status(404).json({ message: 'We cannot find the employee you entered' });
    }

    res.status(200).json({ message: `The employee ${employee.first_name} has been deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Iniciar sesión

export const login = async (req, res) => {

  const userFound = await Employee.findOne({ email: req.body.email }).exec();

  if (!userFound) {
    return res.status(400).json({ message: 'The email does not exist' });
  }

  if (userFound && bcrypt.compareSync(req.body.password, userFound.password)) {
    const token = jwt.sign(
      {
        _id: userFound._id,
        first_name: userFound.first_name,
        last_name: userFound.last_name,
        user_name: userFound.user_name,
        employee_number: userFound.employee_number,
        rol: userFound.rol,
        at_complex: userFound.at_complex,
      },
      process.env.ADMINS_SECRET+process.env.ADMINS_AUTH,
      {
        expiresIn: '5m',
      }
    );

    return res.status(200).json({ token });
  }
}