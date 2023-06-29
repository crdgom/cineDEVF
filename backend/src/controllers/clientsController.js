import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import 'dotenv/config.js'
import Client from '../models/clientsModels.js';

// Obtener todos los clientes
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un cliente por su ID
export const getClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await client.findById(id);
    
    if (!client) {
      return res.status(404).json({ message: 'We cannot find the client you entered' });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un cliente
export const createClient = async (req, res) => {
    const { first_name, last_name, user_name, DNI, client_number, email, password, phone_number, rol } = req.body;
    
    try {
        const newClient = new Client({
          first_name,
          last_name,
          user_name,
          DNI,
          client_number,
          email,
          password: bcrypt.hashSync(password, 10),
          phone_number,
          rol,
        });
    
        newClient.save()
          .then((client) => {
            const { _id, first_name, last_name, user_name, DNI, client_number, email, phone_number, rol} = client;
            res.status(201).json({ 
              _id,
              first_name,
              last_name,
              user_name,
              DNI,
              client_number,
              email,
              phone_number,
              rol,
            });
          })
          .catch((error) => {
            res.status(500).json({ message: error.message });
          });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


// Actualizar un cliente por su ID
export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, user_name, DNI, client_number, email, phone_number, rol } = req.body;

      const client = await Client.findByIdAndUpdate(id, {
        first_name,
        last_name,
        user_name,
        DNI,
        client_number,
        email,
        phone_number,
        rol,
      }, { new: true });

      if (!client) {
        return res.status(404).json({ message: 'We cannot find the client you entered' });
      }

      res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Borrar un cliente por su ID
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByIdAndRemove(id);
    
    if (!client) {
      return res.status(404).json({ message: 'We cannot find the client you entered' });
    }

    res.status(200).json({ message: `The client ${client.first_name} has been deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login de un cliente
export const login = async (req, res) => {

    const userFound = await Client.findOne({ email: req.body.email }).exec();
  
    if (!userFound) {
      return res.status(400).json({ message: 'The email does not exist' });
    }
  
    if (userFound && bcrypt.compareSync(req.body.password, userFound.password)) {
      const token = Jwt.sign(
        {
          _id: userFound._id,
          first_name: userFound.first_name,
          last_name: userFound.last_name,
          user_name: userFound.user_name,
          rol: userFound.rol,
        },
        process.env.CLIENTS_AUTH,
        {
          expiresIn: '5m',
        }
      );
  
      return res.status(200).json({ token });
    }
  }

