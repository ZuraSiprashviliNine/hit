
import express from 'express';
const Router = express.Router();

import user from './user';
import language from './language';

Router.use('/user', user);
Router.use('/language', language);

export default Router;