import Ticket from '../models/ticket.js';
import Seat from '../models/seat.js';

export const createTicket = async (req, res) => {
  try {
    const { cinemaComplex, movie, schedule, seat } = req.body;

    // Verificar si el asiento está disponible
    const existingSeat = await Seat.findById(seat);
    if (!existingSeat || !existingSeat.availability) {
      return res.status(404).json({ message: 'The selected seat is not available' });
    }

    // Crear el ticket
    const ticket = new Ticket({
      cinemaComplex,
      movie,
      schedule,
      seat,
    });

    // Guardar el ticket en la base de datos
    const createdTicket = await ticket.save();

    // Actualizar el estado del asiento a no disponible (false)
    existingSeat.availability = false; // Cambiar a true si se prefiere marcar como disponible
    await existingSeat.save();

    res.status(201).json(createdTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Obtener todos los tickets
export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un ticket por su ID
export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un ticket por su ID

export const updateTicket = async (req, res) => {
  try {
    const { cinemaComplex, movie, schedule, seat } = req.body;
    const { id } = req.params;

    // Verificar si el asiento está disponible
    const existingSeat = await Seat.findById(seat);
    if (!existingSeat || !existingSeat.availability) {
      return res.status(404).json({ message: 'The selected seat is not available' });
    }

    // Buscar y actualizar el ticket
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      {
        cinemaComplex,
        movie,
        schedule,
        seat,
      },
      { new: true }
    );

    // Actualizar el estado del asiento a no disponible (false)
    existingSeat.availability = false; // Cambiar a true si se prefiere marcar como disponible
    await existingSeat.save();

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Eliminar un ticket por su ID
export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndRemove(id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
