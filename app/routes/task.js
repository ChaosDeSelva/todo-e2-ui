import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  getData(param){
    return Ember.RSVP.hash({
      task: this.get('store').findRecord('task', param.task_id),
      group: this.store.findAll('group')
    });
  },

  model: function(param) {
    var promise = this.get('session').get('promise');
    if (promise===null){
      console.log('Why do you fail me!?');
    } else {

      return promise.then(function() {
        return this.getData(param);
      }.bind(this), function() {
        return this.getData(param);
      }.bind(this));


    }
  }
});
