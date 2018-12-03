
class Controller {
  constructor(props){

    this.renderPage = this.renderPage.bind(this);
    this.getPath = this.getPath.bind(this);
  }

  getPath(){
    return this.path;
  }

  renderPage(page, data = {}){
    return (req, res, next) => {
      res.render(page, {
        page: data
      });
    }
  }
}

export default Controller;
