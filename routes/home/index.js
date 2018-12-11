
import express from 'express';
const Router = express.Router();

Router.route('/')
    .get((req, res, next) => {
        res.render('pages/home');
    });

export default Router;