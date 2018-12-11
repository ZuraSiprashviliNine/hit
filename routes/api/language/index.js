
import express from 'express';
const Router = express.Router();

import { setLanguage, redirect, getLanguage } from './help';

Router.route('/')
    .get(
        getLanguage()
    )
    .post(
        setLanguage(),
        redirect()
    );


export default Router;