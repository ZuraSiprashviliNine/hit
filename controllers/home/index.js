
import Controller from '../controller';

class Home extends Controller{
  constructor(){
    super();
    this.path = '/';
    this.get = this.get.bind(this);
    this.act = this.act.bind(this);

  }

  get(){
    return [
      (req, res, next) => {
        res.end('hello');
      }
    ]
  }

  act(){
    return [
      {
        method: 'get',
        mid: this.get
      }
    ]
  }
}

export default Home;
