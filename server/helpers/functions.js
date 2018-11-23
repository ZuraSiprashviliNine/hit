
const fs = require('fs');
const path = require('path');

exports.setLanguage = options => {
    return (req, res, next) => {
        fs.readFile(path.resolve(__dirname, '../', 'config', 'language.json'), {
            encoding: 'utf8'
        }, (err, data) => {
            if(err){
                next(err);
            }else{
                res.locals.constants = JSON.parse(data);
                if(res.locals.vars){
                    res.locals.vars = {
                        ...res.locals.vars,
                    };
                    if(res.locals.vars.page){
                        res.locals.vars = {
                            page: {
                                ...res.locals.vars.page
                            }
                        };
                    }else{
                        res.locals.vars = {
                            ...res.locals.vars,
                            page: {}
                        };
                    }
                }else{
                    res.locals.vars = {
                        page: {}
                    };
                }
                fs.readFile(path.resolve(__dirname, '../', 'config', 'keywords.json'), {
                    encoding: 'utf8'
                }, (err, keywords) => {
                    if(err){
                        next(err);
                    }else{
                        res.locals.keywords = JSON.parse(keywords);
                        next();
                    }
                })
            }
        });
    }
}
