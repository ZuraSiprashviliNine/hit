
import config from '../../config';

import mongoose from 'mongoose';

import sets from '../../config/sets';
import middlewares from '../../config/middlewares';

import routes from '../../routes';

class App {
    constructor({
        express,
        Emitter
    }){
        this.express = express;
        this.emitter = Emitter;

        this.app = null;

        this.rock = this.rock.bind(this);
        
        this.expressify = this.expressify.bind(this);

        this.run = this.run.bind(this);
        this.onRun = this.onRun.bind(this);

        this.db = this.db.bind(this);

        this.set = this.set.bind(this);
        this.sets = this.sets.bind(this);
        
        this.middleware = this.middleware.bind(this);
        this.middlewares = this.middlewares.bind(this);

        this.route = this.route.bind(this);
        this.routes = this.routes.bind(this);

        return this;
    }

    rock(){
        return () => {
            this.emitter.emit('rock', () => {
                this.db()();
            });
        }
    }
    
    expressify(){
        return () => {
            this.app = this.express();

            this.emitter.emit('expressify', () => {
                this.run()();
            });
        }
    }

    onRun(){
        return err => {
            if(err){
                this.emitter.emit('run');
            }else{
                this.emitter.emit('run', err, config.server.port, () => {
                    this.sets()();
                });
            }
        }
    }

    run(){
        return () => {
            this.app.listen(config.server.port, this.onRun());
        }
    }

    db(){
        return () => {
            mongoose.connect(config.db.dsn({
                username: config.db.username,
                password: config.db.password,
                db: config.db.db
            }), {
                useNewUrlParser: true
            }, error => {
                if(error){
                    this.emitter.emit('db', {err: error});
                }else{
                    this.emitter.emit('db', {
                        callback: () => {
                            this.expressify()();
                        }
                    });
                }
            });
        }
    }

    set(){
        return (name, value) => {
            this.app.set(name, value);
            this.emitter.emit('setting', {name, value});
        }
    }

    sets(){
        return () => {
            sets.map(set => {
                this.set()(
                    set.name,
                    set.value
                )
            });

            this.emitter.emit('set', () => {
                this.middlewares()();
            })
        }
    }

    middleware(){
        return ({path, name, middleware}) => {
            if(path){
                this.app.use(path, middleware());
            }else{
                this.app.use(middleware());
            }

            this.emitter.emit('middleware', {
                name,
                path
            });
        }
    }
    
    middlewares(){
        return () => {
            middlewares.map(middleware => {
                this.middleware()(middleware);
            });

            this.emitter.emit('middlewares', () => {
                this.routes()();  
            })
        }
    }

    route(){
        return ({path, name, route}) => {
            this.app.use(path, route);

            this.emitter.emit('route', {
                name,
                path
            });
        }
    }

    routes(){
        return () => {
            routes.map(route => {
                this.route()(route);
            });

            this.emitter.emit('routes', () => {
                console.log('ready to fuck');
            })
        }
    }
}

export default App;