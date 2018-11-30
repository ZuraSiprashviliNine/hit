
import express from 'express';
import Events from 'events';
import util from 'util';

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
  let controllerAct;
  Controllers.map(controller => {
    controllerAct = controller.inst.act();
    controllerAct.map(act => {
      router.addRoute({
        method: act.method,
        path: controller.inst.getPath(),
        middleware: act.mid(),
        callback: () => {
          AppEmitter.emit('route', {
            route: controller.inst.getPath(),
            method: act.method
          })
        }
      })
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
