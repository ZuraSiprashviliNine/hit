
import express from 'express';
import { login, loginGet } from './help';
import { out } from '../api/user/help';
const Router = express.Router();

Router.route('/login')
    .post(login());

Router.route('/logout')
    .post(
        out(),
        (req, res, next) => {
            res.redirect(req.header('Referer'));
        }
    );
    
export default Router;