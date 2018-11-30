
class About{
  constructor(){
    this.path = '/about';
    this.get = this.get.bind(this);
    this.getPath = this.getPath.bind(this);
    this.act = this.act.bind(this);
  }

  getPath(){
    return this.path;
  }

  get(){
    return (req, res, next) => {
      res.end('about world');
    }
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

export default About;
