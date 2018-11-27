
class Application {
    constructor({express}){
        this.app = null;
        this.express = express;

        this.getApp = this.getApp.bind(this);

        this.expressify = this.expressify.bind(this);
        this.run = this.run.bind(this);
        this.middleware = this.middleware.bind(this);
        this.set = this.set.bind(this);
    }

    getApp(){
      return this.app;
    }

    expressify ({callback}){
        let res = this.app = this.express();

        return callback !== undefined ? (
            callback(res)
        ) : res;
    }

    run({port, host, onListening, callback}){
        let res = this.app.listen(port, host, onListening);

        return callback !== undefined ? (
            callback(res)
        ) : res;
    }

    middleware({route, mid, callback}){
      let res;
      if(route){
        res = this.app.use(route, mid());
      }else{
        res = this.app.use(mid());
      }
      return callback !== undefined ? callback(res) : res;
    }

    set({name, value, callback}){
      let res = this.app.set(name, value);
      return callback !== undefined ? callback(res) : res;
    }
}

export default Application;
