import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    hour: {
        type: Date,
        required: true,
        validation: function (value) {
            const timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;
            return timeRegex.test(value);
        }
    },
    auditorium:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auditorium',
    }
});

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    duration: {
        type: Number,
        required: true,

    },
    genre: {
        type: String,
        required: true,

    },

    schedules: [scheduleSchema],

    image: {
        type: String,
        required: true,

    },

    price: {
        type: Number,
        required: true,

    },
});

const Movie = mongoose.model('Movie', movieSchema);
