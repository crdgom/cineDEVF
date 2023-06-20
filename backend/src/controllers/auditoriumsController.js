import Auditorium from '../models/auditoriumsModels.js';
import Seat from '../models/seatsModels.js';
import CinemaComplex from '../models/cinemaComplexModels.js';

export const createAuditorium = async (req, res) => {
  try {
    const { name, capacity, cinemaComplexName } = req.body;

    // Verificar que la capacidad esté entre 100 y 500
    if (capacity < 100 || capacity > 500) {
      return res.status(400).json({ message: 'We do not have auditoriums with less than 100 seats or more than 500 seats. Please enter a capacity between 100 and 500.' });
    }

    // Buscar el complejo de cine por el nombre
    const cinemaComplex = await CinemaComplex.findOne({ complex_name: cinemaComplexName });

    if (!cinemaComplex) {
      return res.status(404).json({ message: 'Cinema complex not found. Please provide a valid cinema complex name.' });
    }

    const auditorium = await Auditorium.create({ name, capacity, cinemaComplex: cinemaComplex._id });

    // Generar los asientos automáticamente
    const seats = [];
    for (let row = 1; row <= capacity / 10; row++) {
      for (let seat_number = 1; seat_number <= 10; seat_number++) {
        seats.push({
          seat_number: seat_number,
          seat_row: String.fromCharCode(65 + row - 1), // Convertir número de fila a letra (A, B, C, ...)
          availability: true,
          auditorium: auditorium._id, // Asociar los asientos al auditorio creado
        });
      }
    }

    await Seat.create(seats);

    res.status(201).json({ message: 'The auditorium has been successfully created.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

