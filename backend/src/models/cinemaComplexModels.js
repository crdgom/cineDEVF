import mongoose from 'mongoose';

const cinemaComplexSchema = new mongoose.Schema({
    complex_name:{
        type: String,
        required: true,
    },
    complex_number:{
        type: Number,
        required: true,
    },
    auditoriums:{
        type: Number,
        required: true,
    },
    address:{
        street:{
            type: String,
            required: true,
        },
        exterior_number:{
            type: String,
            required: true,
        },
        postal_code:{
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true,
        },
        district:{
            type: String,
            required: true,
        },
        zone:{
            type: String,
            required: true,
        }
    },
});

const CinemaComplex = mongoose.model('CinemaComplex', cinemaComplexSchema);

export default CinemaComplex;
