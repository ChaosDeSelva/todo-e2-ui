import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  actions:{
    viewTask (id){
      this.get('goto')(id);
    },
    completeTask (id){
      this.get('store').findRecord('task', id, { backgroundReload: false }).then(function(task) {
        task.set('completed', true);
        task.save();
        window.swal("Wow", "You actually completed a task!", "success");
      });
    },
    deleteTask (id){
      this.get('store').findRecord('task', id, { backgroundReload: false }).then(function(task) {
        task.destroyRecord();
        window.swal("Well...", "You deleted it.", "success");
      });
    }
  }
});
