
const express = require('express');
const Router = express.Router();

// const home = require('./home');
const about = require('./about');
const product = require('./product');
const products = require('./products');

const actions = require('./actions');

Router.use('/about', about);
Router.use('/product', product);
Router.use('/products', products);
Router.use('/action', actions);

Router.use('/', (req, res, next) => {
    res.redirect('/products');
});

module.exports = Router;
