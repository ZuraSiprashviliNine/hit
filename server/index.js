
import express from 'express';
import EventEmitter from 'events';

import App from './app';
import Event from './event';

class _EventEmitter extends EventEmitter{};

const Emitter = new _EventEmitter();
const event = new Event({Emitter});

event.rock();
event.expressify();
event.run();
event.db();
event.setting();
event.set();
event.middleware();
event.middlewares();
event.route();
event.routes();

const app = new App({
	express,
	Emitter
});


app.rock()()