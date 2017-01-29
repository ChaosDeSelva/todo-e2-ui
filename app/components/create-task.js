import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  i18n: Ember.inject.service(),

  taskName: '',
  description: '',
  privateStatus: false,

  actions:{
    myOnChangedAction (value) {
      this.set('description', value);
    },
    createTask (){
      var taskName = this.get('taskName');
      const i18n = this.get('i18n');

      if (taskName.length > 0){
        var task = this.get('store').createRecord('task', {
          name: this.get('taskName'),
          description: this.get('description'),
          completed: false,
          private: this.get('privateStatus'),
          uid: this.get('session').uid
        });

        task.save();
        this.set('taskName', '');
        this.set('description', '');
        this.set('privateStatus', false);

        const successTitle = i18n.t('create.task.success.title').string;
        const successMsg = i18n.t('create.task.success.message').string;

        window.swal(successTitle, successMsg, "success");
      } else {
          const errTitle = i18n.t('create.task.required.title').string;
          const errMsg = i18n.t('create.task.required.message').string;

          window.swal(errTitle, errMsg, "error");
      }
    }
  }
});
