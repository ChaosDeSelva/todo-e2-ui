import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    i18n: Ember.inject.service(),

    cacheModel: [],

    filterEnabled: false,

    actions: {
        filterOn (){
            this.set('filterEnabled', true);
            var model = this.get('model');
            this.set('cacheModel', model);
            this.set('model', model.filterBy('uid', this.get('session.uid')));
        },
        filterOff (){
            this.set('filterEnabled', false);
            var cacheModel = this.get('cacheModel');
            this.set('model', cacheModel);

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
