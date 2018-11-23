
const {setLanguage} = require('./functions');

exports.renderPage = (pageName, options = {}) => {
    return [
        setLanguage(),
        (req, res, next) => {
            res.render(pageName);
        }
    ];
}
