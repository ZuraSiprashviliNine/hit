
import mongoose from 'mongoose';

import validator from 'validator';

import JWT from 'jsonwebtoken';

import config from '../../config';

export class ErrorObject {
    constructor({
        name, message
    }){
        this.message = message;
        this.name = name;

        this.get = this.get.bind(this);

        return this.get();
    }

    get(){
        return {
            name: this.name,
            message: this.message,
            time: Date.now()
        }
    }
}

const Schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        requried: true
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
        enum: ['Male', 'Female', 'male', 'female'],
        required: true
    },
    phone: {
        type: String
    },
    location: {
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    time: {
        created: {
            type: Date,
            default: Date.now()
        },
        updated: {
            type: Date
        }
    },
    ip: {
        type: String
    }
}, {
    versionKey: false
});

Schema.methods.val = function(){
    let errors = [];

    if(this.firstName){
        if(validator.isEmpty(this.firstName)){
            errors.push(new ErrorObject({
                name: 'firstName',
                message: 'is empty'
            }));
        }
    }else{
        errors.push(new ErrorObject({
            name: 'firstName',
            message: 'is empty'
        }));
    }

    if(this.lastName){
        if(validator.isEmpty(this.lastName)){
            errors.push(new ErrorObject({
                name: 'lastName',
                message: 'is empty'
            }));
        }
    }else{
        errors.push(new ErrorObject({
            name: 'lastName',
            message: 'is empty'
        }))
    }

    if(this.email){
        if(validator.isEmpty(this.email)){
            errors.push(new ErrorObject({
                name: 'email',
                message: 'is empty'
            }));
        }else{
            if(!validator.isEmail(this.email)){
                errors.push(new ErrorObject({
                    name: 'email',
                    message: 'is not email'
                }));
            }
        }
    }else{
        errors.push(new ErrorObject({
            name: 'email',
            message: 'is empty'
        }))
    }

    if(this.password){
        if(validator.isEmpty(this.password)){
            errors.push(new ErrorObject({
                name: 'password',
                message: 'is empty'
            }));
        }else{
            if(validator.isLength(this.password, {
                max: 4
            })){
                errors.push(new ErrorObject({
                    name: 'password',
                    message: 'has to be min 5 length'
                }));
            }
        }
    }else{
        errors.push(new ErrorObject({
            name: 'password',
            message: 'is empty'
        }));
    }

    if(this.birthDate){
        // if(validator.isEmpty(this.birthDate)){
        //     errors.push(new ErrorObject({
        //         name: 'birthDate',
        //         message: 'is empty'
        //     }));
        // }else{
            // let date =  new Date();
            // date.setFullYear(date.getFullYear() - 1);
            // if(!validator.isBefore(this.birthDate, date.toISO)){
            //     errors.push(new ErrorObject({
            //         name: 'birthDate',
            //         message: 'not 18 years'
            //     }))
            // }
        // }
    }else{
        errors.push(new ErrorObject({
            name: 'birthDate',
            message: 'is empty'
        }))
    }

    if(this.gender){
        if(validator.isEmpty(this.gender)){
            errors.push(new ErrorObject({
                name: 'gender',
                message: 'not selected'
            }));
        }else{
            const gender = this.gender.toLowerCase();
            if(gender !== 'male' && gender !== 'female'){
                errors.push(new ErrorObject({
                    name: 'gender',
                    message: 'not selected'
                }));
            }
        }
    }else{
        errors.push(new ErrorObject({
            name: 'gender',
            message: 'not selected'
        }));
    }

    if(this.location.country){
        if(validator.isEmpty(this.location.country)){
            errors.push(new ErrorObject({
                name: 'country',
                message: 'is empty'
            }));
        }
    }else{
        errors.push(new ErrorObject({
            name: 'country',
            message: 'is empty'
        }));
    }

    if(this.location.city){
        if(validator.isEmpty(this.location.city)){
            errors.push(new ErrorObject({
                name: 'city',
                message: 'is empty'
            }));
        }
    }else{
        errors.push(new ErrorObject({
            name: 'city',
            message: 'is empty'
        }));
    }

    if(this.location.address){
        if(validator.isEmpty(this.location.address)){
            errors.push(new ErrorObject({
                name: 'address',
                message: 'is empty'
            }));
        }
    }else{
        errors.push(new ErrorObject({
            name: 'address',
            message: 'is empty'
        }));
    }

    return errors.length ? errors : false;
};

Schema.pre('save', function(next) {
    this.password = JWT.sign(this.password, config.jwt.key);
    next();
});

Schema.statics.checkEmail = function({email, callback}){
    model.findOne({
        email
    }, {
        email: true
    }, (err, data) => {
        if(err){
            throw err;
        }else{
            callback(data ? true : false);
        }
    });
}

const model = mongoose.model('users', Schema);

export default model;