
const express = require('express');
const Router = express.Router();

const {postLanguage} = require('./language');

Router.route('/language')
    .post(postLanguage());

module.exports = Router;
