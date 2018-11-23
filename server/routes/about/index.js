
const express = require('express');
const Router = express.Router();

const {renderPage} = require('../../helpers/get');

Router.route('/')
    .get(renderPage('about'));

module.exports = Router;