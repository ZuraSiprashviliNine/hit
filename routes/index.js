
import Home from './home';
import About from './about';
import User from './user';
import Api from './api';

import Control from './control';

export default [
    {
        name: 'Home',
        path: '/',
        route: Home
    },
    {
        name: 'About',
        path: '/about',
        route: About
    },
    {
        name: 'Api',
        path: '/api',
        route: Api
    },
    {
        name: 'Control',
        path: '/control',
        route: Control
    },
    {
        name: 'User',
        path: '/user',
        route: User
    }
]