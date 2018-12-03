
import Controller from '../controller';

class Products extends Controller{
  constructor(){
    super();
    this.path = '/products';
    this.get = this.get.bind(this);
    this.act = this.act.bind(this);

  }

  get(){
    return [
      (req, res, next) => {
        res.end('products world');
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

export default Products;
