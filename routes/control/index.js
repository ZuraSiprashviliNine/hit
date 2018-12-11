
import express from 'express';
import { login } from './help';

import { logged } from '../api/user/help';

const Router = express.Router();

Router.route('/')
    .get(
        logged(),
        (req, res, next) => {
            if(req.logged === true){
                res.render('control/dashboard');
            }else{
                next();
            }
        },
        login()
    );

export default Router;