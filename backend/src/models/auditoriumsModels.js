import mongoose from 'mongoose';
import Seat from './seatsModels.js';
import CinemaComplex from './cinemaComplexModels.js';

const auditoriumSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: function (value) {
            const nameRegex = /^[A-Z]+$/;
            return nameRegex.test(value);
        },   
        required: true,
        min:1,
        max:1,
    },

    capacity: {
        type: Number,
        required: true,
        min: 100,
        max: 500,
    },
    seats:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat',
    },
    cinemaComplex: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CinemaComplex',
    }
}, {
    collection: 'auditoriums',
});

const Auditorium = mongoose.model('auditorium', auditoriumSchema);

export default Auditorium;

