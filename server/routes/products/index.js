
const express = require('express');
const Router = express.Router();

const {renderPage} = require('../../helpers/get');

const {setVars} = require('./help');

Router.route('/')
    .get([
        setVars(),
        renderPage('products')
    ]);

module.exports = Router;
