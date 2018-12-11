
import cookieParser from 'cookie-parser';
import Morgan from 'morgan';
import express from 'express';
import sassMiddleware from 'node-sass-middleware';

import fs from 'fs';
import path from 'path';

import config from '../config';

export default [
    {
        name: 'cookie-parser',
        middleware: () => cookieParser()
    },
    {
        name: 'Morgan',
        middleware: () => Morgan('dev')
    },
    {
        name: 'express-json',
        middleware: () => express.json()
    },
    {
        name: 'express-urlencoded',
        middleware: () => express.urlencoded({extended: false})
    },
    {
        name: 'node-sass-middleware',
        middleware: () => sassMiddleware({
            src: config.sass.src.path,
            dest: config.sass.dest.path,
            debug: true,
            outputStyle: 'compressed',
        })
    },
    {
        name: 'static',
        path: '/',
        middleware: () => express.static('static')
    },
    {
        name: 'language',
        middleware: () => {
            return [
                (req, res, next) => {
                    if(!res.locals.keywords){
                        fs.readFile(path.resolve(__dirname, '../', 'assets', 'json', 'language.json'), {
                            encoding: 'utf8'
                        }, (err, data) => {
                            if(err){
                                next(err);
                            }else{
                                req.keywords = JSON.parse(data);
                                next();
                            }
                        })
                    }else{
                        next();   
                    }
                },
                (req, res, next) => {
                    let language = req.cookies.language || 'en';
                    res.locals.keywords = req.keywords;
                    res.locals.language = language;
                    res.locals.translate = text => req.keywords[language][text] || text;
                    next();
                }
            ]
        }
    }
]