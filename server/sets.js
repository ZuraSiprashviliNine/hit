
import config from '../config';

export function mapSets({sets, App, AppEmitter}){
  return sets.map(set => {
    App.set({
      name: set.name,
      value: set.value,
      callback: () => {
        AppEmitter.emit('set', {
          what: set.name
        })
      }
    });
  })
}

export default [
  {
    name: 'view engine',
    value: 'pug'
  },
  {
    name: 'views',
    value: config.views.path
  }
]
