import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: config.services.taskUrl,
  session: Ember.inject.service(),
  headers: Ember.computed('session.token', function(){
    return {
       'Authorization': 'Basic ' + this.get('session.token')
    }
  })
});
