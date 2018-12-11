
import express from 'express';
const Router = express.Router();

import User from '../../../models/user';

import {getAll} from './sos';
import { modification, validation, creation, handle, checkEmail, verify, auth, out, logged } from './help';

Router.route('/')
    .get((req, res, next) => {
        getAll(User, (err, docs) => {
            if(err){
                next(err);
            }else{
                res.json(docs);
            }
        })
    })
    .post(
        modification('registration'),
        validation(),
        checkEmail(User),
        creation(User),
        handle()
    );
Router.route('/login')
    .post(
        modification('login'),
        checkEmail(User),
        verify(User),
        auth(),
        handle()
    );
Router.route('/login/out')
    .post(out());
export default Router;