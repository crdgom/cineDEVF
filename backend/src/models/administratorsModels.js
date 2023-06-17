import mongoose from'mongoose';

export const administratorSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    last_name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    user_name: {
        type: String,
        required: true,
        min: 3,
        max: 255,
        unique: true
    },
    DNI: {
        type: String,
        required: true,
        unique: true,
        validate: function (value) {
            const dniRegex = /^\d{8}(?:[-\s]\d{4})?$/;
            return dniRegex.test(value);
        }
    },
    employee_number: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: function (value) {
            const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);

        }
    },
    password: {
        type: String,
        required: true,
        validate: function (value) {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            return passwordRegex.test(value);
        }
    },
    phone_number: {
        type: String,
        required: true,
        validate: function (value) {
            const phoneRegex = /^\d{10}$/;
            return phoneRegex.test(value);
        }
    },
    rol:{
        type: String,
        required: true,
        enum: ['admin'],
        default: 'admin'
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date.now
    }
});