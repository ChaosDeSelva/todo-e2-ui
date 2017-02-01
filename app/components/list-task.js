import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  session: Ember.inject.service(),
  i18n: Ember.inject.service(),

  filterEnabled: false,
  modelChanged: 0,

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
    modelChange (){
      var newVal = this.get('modelChanged') + 1;
      this.set('modelChanged',  newVal);
    },
    searchTasks(param) {
      param = (param) ? param : "";

      var model = this.get('model');
      var filterEnabled = this.get('filterEnabled');
      var sessionId = this.get('session.uid');

      return new Promise( function(resolve, reject){
        resolve(model.filter(function(item){
          if( filterEnabled){
            return (item.get('name').toLowerCase().includes(param) || item.get('tags') && JSON.stringify(item.get('tags')).includes(param)) && item.get('uid') == sessionId;
          } else {
            return item.get('name').toLowerCase().includes(param) || item.get('tags') && JSON.stringify(item.get('tags')).includes(param);
          }
        })
      );

        reject(function(){ return false; });
      });
     },
        completeTask (id){
            const i18n = this.get('i18n');

            this.get('store').findRecord('task', id).then(function (task) {
                task.set('completed', true);
                task.save();

                const completeTitle = i18n.t('complete.title').string;
                const completeMsg = i18n.t('complete.message').string;

                window.swal(completeTitle, completeMsg, "success");
            });
        },
        deleteTask (id){
            const i18n = this.get('i18n');

            var that = this;

            this.get('store').findRecord('task', id, {backgroundReload: false}).then(function (task) {
                task.destroyRecord().then(function(){
                  const deleteTitle = i18n.t('delete.title').string;
                  const deleteMsg = i18n.t('delete.message').string;

                  window.swal(deleteTitle, deleteMsg, "success");
                  that.send('modelChange');
                });
            });
        }
    }
});
