import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  model (){
    return Ember.$.ajax({
      method: 'GET',
      url: config.services.taskUrl+'/report'
    }).then((info)=>{
      return info;
    });
  }
});
