
const express = require('express');
const util = require('util');
const sassMiddleware = require('node-sass-middleware');
const cookieParser = require('cookie-parser');
const config = require('./config');
const bodyParser = require('body-parser');

const Routes = require('./routes');

const app = express();

app.set('view engine', 'pug');
app.set('views', config.views.path);

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    util.log(req.method + ' ' + req.url);    
    try{
        res.locals.language = req.cookies.language || 'en';
    }catch(e){
        res.locals.language = 'en';
    }
    next();
});

app.use(sassMiddleware({
    src: config.sass.src.path,
    dest: config.sass.dest.path,
    debug: false,
    outputStyle: 'compressed',
    prefix: config.sass.prefix
}));

app.use(express.static('static'));

app.use(Routes);

app.listen(
    config.server.port,
    config.server.host,
    config.server.onListening
);
