import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
  },
  cinema_complex: {
    type: String,
    required: true,
  },
  movie: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  seats: {
    type: [String],
    required: true,
  },
  // Otros campos adicionales según tus necesidades
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
