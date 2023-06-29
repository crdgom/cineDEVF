import mongoose from'mongoose';

const clientSchema = new mongoose.Schema({
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
    },
    client_number: {
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
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return emailRegex.test(value)
        }
    },
    password: {
        type: String,
        required: true,
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
        enum: ['client'],
        default: 'client'
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
        type: Date,
        default: Date.now,
    }
});

export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async (userPassword, receivedPassword) => {
    return await bcrypt.compare(userPassword, receivedPassword);
}

const Client= mongoose.model('Client', clientSchema);

export default Employee;