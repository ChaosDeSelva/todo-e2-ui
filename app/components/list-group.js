import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    i18n: Ember.inject.service(),


    filterEnabled: false,

    actions: {
        filterOn (){
            this.set('filterEnabled', true);
        },
        filterOff (){
            this.set('filterEnabled', false);
        },
      searchTasks(param) {
        param = (param) ? param.toLowerCase() : "";

        var model = this.get('model');
        var filterEnabled = this.get('filterEnabled');
        var sessionId = this.get('session.uid');

        return new Ember.RSVP.Promise( function(resolve, reject){
          resolve(model.filter(function(item){
              if( filterEnabled){
                return (item.get('name').toLowerCase().includes(param) || item.get('code').toLowerCase().includes(param)) && item.get('uid') === sessionId;
              } else {
                return item.get('name').toLowerCase().includes(param) || item.get('code').toLowerCase().includes(param);
              }
            })
          );

          reject(function(){ return false; });
        });
      },
        viewGroup (id){
            this.get('goto')(id);
        },
      deleteGroup (id){
        const i18n = this.get('i18n');

        this.get('store').findRecord('group', id, {backgroundReload: false}).then(function (group) {
          group.destroyRecord();

          const deleteTitle = i18n.t('delete.group').string;
          const deleteMsg = i18n.t('delete.group.message').string;

          window.swal(deleteTitle, deleteMsg, "success");
        });
      }
    }
});
