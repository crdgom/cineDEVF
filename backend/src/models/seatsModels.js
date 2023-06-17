import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
    seat_number:{
        type: Number,
        required: true,
    },
    seat_row:{
        type: String,
        required: true,
    },
    availability:{
        type: Boolean,
        required: true,
    },
    auditorium:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auditorium',
    }
});

const Seat = mongoose.model('Seat', seatSchema);

export default Seat;