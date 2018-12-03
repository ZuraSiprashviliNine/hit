
import express from 'express';
import Events from 'events';
import util from 'util';
import mongoose from 'mongoose';

import middlewares, {
  mapMiddlewares
} from './middlewares';
import sets, {
  mapSets
} from './sets';

import Application from './application';
import Router from '../router';

import config from '../config';
import Controllers from '../controllers';

class EventEmitter extends Events{};

const AppEmitter = new EventEmitter();

const App = new Application({
    express
});

const ExpressRouter = express.Router();

AppEmitter.on('db', () => {
  util.log('db is ready to fuck');
  AppEmitter.emit('make-it-rock');
});
AppEmitter.on('expressed', () => {
    util.log('App is Expressed');
});
AppEmitter.on('run', () => {
    util.log('App is Running');
    AppEmitter.emit('post-run');
});
AppEmitter.on('middleware', message => {
    util.log(`[${message.what}] middleware has been added`);
});
AppEmitter.on('set', message => {
  util.log(`[${message.what}] Setting has been added`);
});
AppEmitter.on('route', message => {
  util.log(`[${message.route}] [${message.method}] Route has been added`);
});
AppEmitter.on('set-middlewares', mapMiddlewares({middlewares, App, AppEmitter}));

AppEmitter.on('set-sets', () => mapSets({sets, App, AppEmitter}));

AppEmitter.on('set-routes', () => {
  let router = new Router({router: ExpressRouter});
  let controllerAct,
      controllerPath;
  Controllers.map(controller => {
    controllerAct = controller.inst.act();
    controllerPath = controller.inst.getPath();
    controllerAct.map(act => {
      if(controllerPath.constructor === Array){
        controllerPath.map(p => {
          router.addRoute({
            method: act.method,
            path: p,
            middleware: act.mid(),
            callback: () => {
              AppEmitter.emit('route', {
                route: p,
                method: act.method
              })
            }
          });
        })
      }else if(controllerPath.constructor === String){
        router.addRoute({
          method: act.method,
          path: controllerPath,
          middleware: act.mid(),
          callback: () => {
            AppEmitter.emit('route', {
              route: controllerPath,
              method: act.method
            })
          }
        })
      }
    })
  })
  AppEmitter.emit('post-routes', router);
});

AppEmitter.on('post-routes', router => {
  App.middleware({
    mid: () => router.getRouter(),
    what: 'Router'
  })
})

AppEmitter.on('post-run', () => {
    AppEmitter.emit('set-middlewares');

    AppEmitter.emit('set-sets');

    AppEmitter.emit('set-routes');
});

AppEmitter.on('make-it-rock', () => {
  App.expressify({
      callback: () => {
          AppEmitter.emit('expressed');
          App.run({
              port: config.base.port,
              host: config.base.host,
              onListening: config.base.onListening,
              callback: () => {
                  AppEmitter.emit('run');
              }
          });
      }
  });
})

mongoose.connect(config.db.dsn({
  username: config.db.username,
  password: config.db.password,
  database: config.db.database
}), {
    useNewUrlParser: true
}, err => {
    if(err){
        throw err;
    }else{
      AppEmitter.emit('db');
    }
});
