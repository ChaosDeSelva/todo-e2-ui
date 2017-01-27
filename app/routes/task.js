import Ember from 'ember';

export default Ember.Route.extend({
  model: function(param) {
    return this.get('store').findRecord('task', param.task_id);
  }
});
