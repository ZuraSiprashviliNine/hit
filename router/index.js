
class Router {
  constructor({router}){
    this.router = router;

    this.addRoute = this.addRoute.bind(this);
  }

  addRoute({method, path, middleware, callback}){
    this.router[method](path, middleware);

    if(callback){
      callback();
    }
  }

  getRouter(){
    return this.router;
  }
}

export default Router;
