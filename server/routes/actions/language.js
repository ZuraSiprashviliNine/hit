
exports.postLanguage = (options = {}) => {
    return (req, res, next) => {
        res.cookie('language', req.body.lang);
        res.locals.language = req.body.lang;
        res.redirect(req.header('Referer'));
        // next();
    }
}
