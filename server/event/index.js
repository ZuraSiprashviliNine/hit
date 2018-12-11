
import util from 'util';

class Event {
    constructor({
        Emitter
    }){
        this.emitter = Emitter;

        this.rock = this.rock.bind(this);
        this.expressify = this.expressify.bind(this);
        this.run = this.run.bind(this);

        this.db = this.db.bind(this);
        
        this.setting = this.setting.bind(this);
        this.set = this.set.bind(this);

        this.middleware = this.middleware.bind(this);
        this.middlewares = this.middlewares.bind(this);

        this.route = this.route.bind(this);
        this.routes = this.routes.bind(this);
    }

    rock(){
        return this.emitter.on('rock', callback => {
            util.log('lets make a rock');

            if(callback){
                callback();
            }
        });
    }

    db(){
        return this.emitter.on('db', ({err, callback}) => {
            if(err){
                util.log('error in db', err);
            }else{
                util.log('database connected');
                if(callback){
                    callback();
                }
            }
        })
    }
    
    expressify(){
        return this.emitter.on('expressify', callback => {
            util.log('expressify [completed]');

            if(callback){
                callback();
            }
        });
    }

    run(){
        return this.emitter.on('run', (err, port, callback) => {
            if(err){
                util.log('error during run', err.message);
            }else{
                util.log(`run [completed] / [${port}]`);

                if(callback){
                    callback();
                }
            }
        });
    }

    setting(){
        return this.emitter.on('setting', ({name, value}, callback) => {
            util.log(`setting [${name}][${value}]`);
            if(callback){
                callback();
            }
        })
    }

    set(){
        return this.emitter.on('set', callback => {
            util.log('setters successfully set');
            if(callback){
                callback();
            }
        })
    }

    middleware(){
        return this.emitter.on('middleware', ({name, path}, callback) => {
            util.log(`middleware [${name}]${path !== undefined ? '[' + path +']' : ''}`);
            
            if(callback){
                callback();
            }
        })
    }

    middlewares(){
        return this.emitter.on('middlewares', callback => {
            util.log('middlewares successfully set');
            if(callback){
                callback();
            }
        });
    }

    route(){
        return this.emitter.on('route', ({name, path}, callback) => {
            util.log(`route [${name}][${path}] added`);
            if(callback){
                callback();
            }
        });
    }

    routes(){
        return this.emitter.on('routes', callback => {
            util.log('routes successfully added');
            if(callback){
                callback();
            }
        })
    }
    
}

export default Event;