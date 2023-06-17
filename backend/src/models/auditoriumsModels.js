import mongoose from 'mongoose';
import Seat from './seatsModels.js';

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
    }
});

const Auditorium = mongoose.model('Auditorium', auditoriumSchema);

export default Auditorium;

