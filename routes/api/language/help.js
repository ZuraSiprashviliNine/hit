
import config from '../../../config';

export function setLanguage(){
    return (req, res, next) => {
        let data = req.body;
        req.body = {};

        if(config.languages.includes(data.language)){
            res.cookie('language', data.language);
        }
        next();
    }
}

export function getLanguage(){
    return (req, res, next) => {
        res.json(req.cookies.language);
    }
}

export function redirect(){
    return (req, res, next) => {
        res.redirect(req.header('Referer') || '/');
    }
}