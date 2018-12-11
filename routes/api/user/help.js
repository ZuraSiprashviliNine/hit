
import stript from 'striptags';
import validator from 'validator';
import config from '../../../config';

import JWT from 'jsonwebtoken';

function findByEmail(email, User, what, callback){
    User.findOne({
        email: email
    }, what, (err, doc) => {
        if(err){
            throw err;
        }else{
            callback(doc);
        }
    })
}
export function modification(_case){
    return (req, res, next) => {
        let fields;
        switch(_case){
            case 'registration': {
                fields = ['firstName', 'gender', 'lastName', 'email', 'birthDate', 'password'];
                break;
            }
            case 'login': {
                fields = ['email', 'password'];
                break;
            }
        }
        let body = req.body;
        req.body = {};

        let _bk = Object.keys(body);

        fields.map(f => {
            if(!_bk.includes(f)){
                req._errors = [
                    {
                        name: f,
                        message: 'empty'
                    }
                ];
                next(new Error('validation'));
                return;
            }
        });

        _bk.map(k => {
            body[k] = stript(body[k]).trim();
        });

        req._data = body;
        next();
    }
}

export function validation(){
    return (req, res, next) => {
        let data = req._data;
        req._data = {};
        let errors = [];

        if(validator.isEmpty(data.firstName)){
            errors.push({
                name: 'firstName',
                message: 'field is empty'
            });
        }
        if(validator.isEmpty(data.lastName)){
            errors.push({
                name: 'lastName',
                message: 'field is empty'
            });
        }
        if(validator.isEmpty(data.email)){
            errors.push({
                name: 'email',
                message: 'field is empty'
            });
        }else if(!validator.isEmail(data.email)){
            errors.push({
                name: 'email',
                message: 'is not valid email address'
            });
        }

        if(validator.isEmpty(data.birthDate)){
            errors.push({
                name: 'birthDate',
                message: 'field is empty'
            });
        }else {
            let _date = new Date();
            let __date = new Date(parseInt(data.birthDate));
            _date.setFullYear(_date.getFullYear() - 12);
            
            if(__date.getTime() > _date.getTime()){
                errors.push({
                    name: 'birthdate',
                    message: 'you are under 12'
                });
            }
        }

        if(validator.isEmpty(data.password)){
            errors.push({
                name: 'password',
                message: 'field is empty'
            });
        }else if(validator.isLength(data.password, {max: 4})){
            errors.push({
                name: 'password',
                message: 'should be min 4 length'
            });
        }
        if(validator.isEmpty(data.gender)){
            errors.push({
                name: 'gender',
                message: 'field is empty'
            });
        }else{
            data.gender = data.gender.toLowerCase();
        }

        if(errors.length){
            req._errors = errors;
            next(new Error('validation'));
        }else{
            req._data = data;
            next();
        }
    }
}

export function checkEmail(User){
    return (req, res, next) => {
        User.findOne({
            email: req._data.email
        }, (err, doc) => {
            if(err){
                next(err);
            }else{
                if(doc){
                    req._check = true;
                }else{
                    req._check = false;
                }
                next();
            }
        })
    }
}

export function creation(User){
    return (req, res, next) => {
        if(req._check){
            req._errors = [
                {
                    name: 'email',
                    message: 'already taken'
                }
            ];
            next(new Error('validation'));
        }else{
            let data = req._data;
            req._data = {};
    
            let _user = new User({
                ...data
            });
    
            _user.save((err, doc) => {
                if(err){
                    next(err);
                }else{
                    res.json(doc);
                }
            })
        }
        
    }
}

export function handle(){
    return (err, req, res, next) => {
        if(err.message === 'validation'){
            res.json({
                status: false,
                errors: req._errors
            });
        }else{
            next(err);
        }
    }
}


export function verify(User){
    return (req, res, next) => {
        if(req._check){
            try{
                findByEmail(
                    req._data.email,
                    User,
                    {
                    },
                    doc => {
                        if(JWT.verify(doc.password, config.jwt.key) === req._data.password){
                            let _user = doc;
                            req._data = _user;
                            next();
                        }else{
                            req._errors = [
                                {
                                    name: 'password',
                                    message: 'incorrect'
                                }
                            ];
                            next(new Error('validation'));
                        }
                    }
                );
            }catch(err){
                next(err);
            }
        }else{
            req._errors = [
                {
                    name: 'email',
                    message: 'does not exists'
                }
            ];
            next(new Error('validation'));
        }
    }
}

export function auth(){
    return (req, res, next) => {
        res.json({
            status: true,
            id: req._data._id
        });
    }
}

export function out(){
    return (req, res, next) => {
        res.clearCookie('auth');
        next();
    }
}

export function logged(){
    return (req, res, next) => {
        if(req.cookies.auth){
            req.logged = true;
        }else{
            req.logged = false;
        }
        next();
    }
}