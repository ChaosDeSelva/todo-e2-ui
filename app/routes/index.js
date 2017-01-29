import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  i18n: Ember.inject.service(),

  model: function() {
    var promise = this.get('session').get('promise');
    if (promise===null){
        console.log('Why do you fail me!?');
    } else {
      return promise.then(function() {
        return this.get('store').findAll('task');
      }.bind(this), function() {
        return this.get('store').findAll('task');
      }.bind(this));
    }
  }
});
