import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  model: function() {
    var promise = this.get('session').get('promise');
    if (promise===null){
        console.log('Why do you fail me!?');
    } else {
      return promise.then(function(value) {
        return this.get('store').findAll('task');
      }.bind(this), function(reason) {
        return this.get('store').findAll('task');
      }.bind(this));
    }
  }
});
