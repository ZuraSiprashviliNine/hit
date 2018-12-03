
import Controller from '../../controller';

import User from '../../../models/users';

import {ErrorObject} from '../../../models/users/index';

class ApiUser extends Controller{
    constructor(){
        super();
        this.path = '/api/user';
        this.post = this.post.bind(this);
        this.delete = this.delete.bind(this);
        this.act = this.act.bind(this);

        this.createUser = this.createUser.bind(this);
        this.save = this.save.bind(this);
        this.createCookie = this.createCookie.bind(this);
        this.errors = this.errors.bind(this);
    }

    createUser(){
        return (req, res, next) => {
            let user = new User(req.user);
            let errors = user.val();
            if(errors === false){
                try{
                    User.checkEmail({
                        email: user.email,
                        callback: result => {
                            if(!result){
                                req.user = user;
                                next();
                            }else{
                                req.user = {};
                                errors = [];
                                errors.push(new ErrorObject({
                                    name: 'email',
                                    message: 'is taken'
                                }));
                                req.errors = errors;
                                next(new Error('validation'));
                            }
                        }
                    })
                }catch(error){
                    next(error);
                }
            }else{
                req.user = {};
                req.errors = errors;
                next(new Error('validation'));
            }
        }
    }

    save(){
        return (req, res, next) => {
            const user = req.user;
            user.save((err, doc) => {
                if(err){
                    next(err);
                }else{
                    req.user = {};
                    req._id = doc._id;
                    next();
                }
            })
        }
    }

    createCookie(){
        return (req, res, next) => {
            res.cookie('user', req._id);
            res.json(req._id);
        }
    }

    errors(){
        return (err, req, res, next) => {
            if(err.message === 'validation'){
                res.json(req.errors);
            }else{
                res.json(err);
            }
        }
    }

    post(){
        return [
            (req, res, next) => {
                let user = JSON.parse(req.body.user);
                req.user = user;
                req.body = {};
                next();
            },
            this.createUser(),
            this.save(),
            this.createCookie(),
            this.errors()
        ]
    }

    delete(){
        return [
            (req, res, next) => {
                let email = JSON.parse(req.body.info).email;
                res.end('in work');
            }
        ];
    }

    act(){
        return [
            {
                method: 'post',
                mid: this.post
            },
            {
                method: 'delete',
                mid: this.delete
            }
        ]
    }
}

export default ApiUser;