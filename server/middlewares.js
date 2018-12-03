
import Morgan from 'morgan';
import CookieParser from 'cookie-parser';
import sassMiddleware from 'node-sass-middleware';
import express from 'express';
import config from '../config';

export function mapMiddlewares({middlewares, App, AppEmitter}){
  return () => middlewares.map(middleware => {
    App.middleware({
        mid: middleware.mid,
        route: middleware.route,
        callback: () => {
            AppEmitter.emit('middleware', {
                what: middleware.what
            })
        }
    });
  });
}

export default [
  {
    mid: () => Morgan('dev'),
    what: 'Morgan'
  },
  {
    mid: () => CookieParser(),
    what: 'Cookie-Parser'
  },
  {
    mid: () => express.json(),
    what: 'express-json'
  },
  {
    mid: () => express.urlencoded({extended: false}),
    what: 'express-urlencoded'
  },
  {
    mid: () => sassMiddleware({
        src: config.sass.src.path,
        dest: config.sass.dest.path,
        debug: true,
        outputStyle: 'compressed',
    }),
    what: 'node-sass-middleware'
  },
  ...config.base.statics.map(s => {
    return {
      mid: () => express.static(s.src),
      route: s.mask,
      what: s.mask
    }
  })
];
