
import Axios from 'axios';
import config from '../../config';

import url from 'url';

export function login(){
    return (req, res, next) => {
        Axios.post(`${config.server.ssl}://${config.server.host}:${config.server.port}/api/user/login`, {
            email: req.body['login-email'],
            password: req.body['login-password']
        })
            .then(response => {
                if(response.data.status === true){
                    res.cookie('auth', response.data.id);
                    res.redirect('/control');
                }else{
                    res.redirect(
                        url.format({
                            pathname: req.header('Referer') || '/',
                            query: {
                                validation: JSON.stringify(response.data)
                            }
                        })
                    );
                }
            })
            .catch(error => {
                res.redirect(req.header('Referer') || '/');
            });
    }
}
