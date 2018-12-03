
import Home from './home';
import About from './about';
import Products from './products';

import ApiUser from './api/user';

export default [
  {
    key: 'Home',
    inst: new Home()
  },
  {
    key: 'About',
    inst: new About()
  },
  {
    key: 'Products',
    inst: new Products()
  },
  {
    key: 'Api User',
    inst: new ApiUser()
  }
]
