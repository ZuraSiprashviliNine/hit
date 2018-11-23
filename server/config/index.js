
const path = require('path');

const paths = {
    root: path.join(__dirname, '../', '../')
};

module.exports = {
    server: {
        port: 3000,
        host: '127.0.0.1',
        onListening: err => {
            if(err){
                throw err;
            }else{
                console.log('ready to fuck');
            }
        },
    },
    views: {
        path: path.join(paths.root, 'client', 'views')
    },
    sass: {
        src: {
            path: path.join(paths.root, 'client', 'style', 'sass')
        },
        dest: {
            path: path.join(paths.root, 'static')
        }
    }
}