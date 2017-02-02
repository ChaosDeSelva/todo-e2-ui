import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

    getData(){
        return Ember.RSVP.hash({
            task: this.get('store').findAll('task'),
            group: this.store.findAll('group')
        });
    },

  model: function() {
    var promise = this.get('session').get('promise');
    if (promise===null){
        console.log('Why do you fail me!?');
    } else {

      return promise.then(function() {
          return this.getData();
      }.bind(this), function() {
          return this.getData();
      }.bind(this));
    }
  }
});
