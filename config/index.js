
import path from 'path';

export default {
  db: {
    username: 'me',
    password: 'Abcd345h',
    database: 'unhit',
    dsn: ({username, password, database}) => `mongodb://${username}:${password}@ds123624.mlab.com:23624/${database}`
  },
  base: {
      port: 69,
      host: '127.0.0.1',
      onListening: err => {
          if (err) {
              console.log('Error During Listening', err.message);
          }else {
              console.log('I am fucking right now');
          }
      },
      statics: [
        {
          src: 'static',
          mask: '/'
        }
      ]
  },
  jwt: {
    key: 'ninia'
  },
  sass: {
      src: {
          path: path.resolve(__dirname, '../', 'client', 'stylesheets', 'sass')
      },
      dest: {
          path: path.resolve(__dirname, '../', 'static')
      }
  },
  views: {
    path: path.resolve(__dirname, '../', 'client', 'views')
  }
};
