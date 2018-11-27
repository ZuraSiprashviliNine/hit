
import path from 'path';

export default {
  base: {
      port: 3000,
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
        },
        {
          src: 'static/images',
          mask: '/images/'
        },
        {
          src: 'static/stylesheets',
          mask: '/stylesheets'
        }
      ]
  },
  sass: {
      src: {
          path: path.resolve(__dirname, '../', 'client', 'stylesheets', 'sass')
      },
      dest: {
          path: path.resolve(__dirname, '../', 'static', 'stylesheets')
      }
  },
  views: {
    path: path.resolve(__dirname, '../', 'client', 'views')
  }
};
