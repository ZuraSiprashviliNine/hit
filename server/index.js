
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

import config from '../config';

class EventEmitter extends Events{};

const AppEmitter = new EventEmitter();

const App = new Application({
    express
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
})

AppEmitter.on('set-middlewares', mapMiddlewares({middlewares, App, AppEmitter}));

AppEmitter.on('set-sets', () => mapSets({sets, App, AppEmitter}));

// AppEmitter.on('routes', () => mapRoutes({routes, App, AppEmitter}));
AppEmitter.on('routes', () => {
  App.getApp().get('/', (req, res, next) => {
    res.render('index');
  })
});

AppEmitter.on('post-run', () => {
    AppEmitter.emit('set-middlewares');

    AppEmitter.emit('set-sets');

    AppEmitter.emit('routes');
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
