
import path from 'path';

export default {
    db: {
        username: 'me',
        password: 'Abcd345h',
        db: 'unhit',
        dsn: ({username, password, db}) => `mongodb://${username}:${password}@ds123624.mlab.com:23624/${db}`
    },
    server: {
        port: process.env.PORT || 3000,
        ssl: 'http',
        host: 'localhost'
    },
    views: {
        path: path.resolve(__dirname, '../views')
    },
    jwt: {
      key: 'ninia'
    },
    sass: {
        src: {
            path: path.resolve(__dirname, '../', 'assets', 'stylesheets')
        },
        dest: {
            path: path.resolve(__dirname, '../', 'static')
        }
    },
    languages: [
        'en',
        'ka',
        'ru'
    ]
}