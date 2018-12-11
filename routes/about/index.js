
import express from 'express';
const Router = express.Router();

Router.route('/')
    .get((req, res, next) => {
        res.end('about');
    });

export default Router;