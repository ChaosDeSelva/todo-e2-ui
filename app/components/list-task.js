import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),

  cacheModel: [],

  filterEnabled: false,

  actions:{
    filterOn (){
      this.set('filterEnabled', true);
      var model = this.get('model');
      this.set('cacheModel', model);
      this.set('model', model.filterBy('uid', this.get('session.uid')));
    },
    filterOff (){
      this.set('filterEnabled', false);
      var cacheModel = this.get('cacheModel');
      this.set('model',cacheModel);

    },
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
