import Auditorium from '../models/auditoriumsModel.js';
import Seat from '../models/seatsModel.js';

export const createAuditorium = async (req, res) => {
  try {
    const { name, capacidad: capacity } = req.body;

    // Verificar que la capacidad esté entre 100 y 500
    if (capacity < 100 || capacity > 500) {
      return res.status(400).json({ message: 'we do not have auditoriums with less than 100 seats or more than 500 seats,\n enter the actual number of seats in the auditorium between 100 and 500.' });
    }

    const auditorium = await Auditorium.create({ name, capacity: capacity });

    // Generar los asientos automáticamente
    const seats = [];
    for (let row = 1; row <= capacity / 10; row++) {
      for (let seat_number = 1; seat_number <= 10; seat_number++) {
        seats.push({
          seat_number: seat_number,
          seat_row: String.fromCharCode(65 + row - 1), // Convertir número de fila a letra (A, B, C, ...)
          availability: true,
          auditorium: auditorium._id, // Asociar los asientos a la sala creada
        });
      }
    }

    await Seat.create(seats);

    res.status(201).json({ message: 'The auditorium has been successfully created.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
