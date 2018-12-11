
import mongoose from 'mongoose';

import config from '../../config';
import JWT from 'jsonwebtoken';

const Schema = mongoose.Schema;

let User = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    phone: {
        type: String,
    },
    location: {
        country: {
            type: String,
        },
        city: {
            type: String,
        },
        address: {
            type: String,
        }
    },
    status: {
        type: String,
        required: true,
        default: 'user'
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updated: {
        type: Date
    },
    ip: {
        type: String
    }
}, {
    versionKey: false
});

User.pre('save', function(next){
    this.password = JWT.sign(this.password, config.jwt.key);
    
    next();
})

const model = mongoose.model('user', User);

export default model;