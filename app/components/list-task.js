import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  i18n: Ember.inject.service(),

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
      const i18n = this.get('i18n');

      this.get('store').findRecord('task', id, { backgroundReload: false }).then(function(task) {
        task.set('completed', true);
        task.save();

        const completeTitle = i18n.t('complete.title').string;
        const completeMsg = i18n.t('complete.message').string;

        window.swal(completeTitle, completeMsg, "success");
      });
    },
    deleteTask (id){
      const i18n = this.get('i18n');

      this.get('store').findRecord('task', id, { backgroundReload: false }).then(function(task) {
        task.destroyRecord();

        const deleteTitle = i18n.t('delete.title').string;
        const deleteMsg = i18n.t('delete.message').string;

        window.swal(deleteTitle, deleteMsg, "success");
      });
    }
  }
});
