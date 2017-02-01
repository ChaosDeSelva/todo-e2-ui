import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  i18n: Ember.inject.service(),

  cacheModel: [],
  modelChanged: 0,
  filterEnabled: false,

  actions:{
    filterOn (){
      this.set('filterEnabled', true);
      this.send('modelChange');
    },
    filterOff (){
      this.set('filterEnabled', false);
      this.send('modelChange');
    },
    viewTask (id){
     this.get('goto')(id);
    },
    searchTasks(param) {
      param = (param) ? param : "";

      var model = this.get('model');
      var filterEnabled = this.get('filterEnabled');
      var sessionId = this.get('session.uid');

      return new Promise( function(resolve, reject){
        resolve(model.filter(function(item){
          if( filterEnabled){
            return (item.get('name').toLowerCase().includes(param) || item.get('description').toLowerCase().includes(param)) && item.get('uid') == sessionId;
          } else {
            return item.get('name').toLowerCase().includes(param) || item.get('description').toLowerCase().includes(param);
          }
        })
      );

        reject(function(){ return false; });
      });
     },
    completeTask (id){
      const i18n = this.get('i18n');

      this.get('store').findRecord('task', id, { backgroundReload: false }).then(function(task) {
        task.set('completed', true);
        task.save();

        const completeTitle = i18n.t('complete.title').string;
        const completeMsg = i18n.t('complete.message').string;

        window.swal(completeTitle, completeMsg, "success");
        this.send('modelChange');
      });
    },
    modelChange(){
      var newVal = this.get('modelChanged') + 1;

      this.set('modelChanged', newVal);
    },
    deleteTask (id){
      const i18n = this.get('i18n');

      var that = this;


      this.get('store').findRecord('task', id, { backgroundReload: false }).then(function(task) {
        task.destroyRecord();

        const deleteTitle = i18n.t('delete.title').string;
        const deleteMsg = i18n.t('delete.message').string;

        window.swal(deleteTitle, deleteMsg, "success");
        that.send('modelChange');
      });
    }
  }
});
