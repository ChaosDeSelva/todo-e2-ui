import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),

  taskName: '',
  description: '',
  privateStatus: false,

  actions:{
    createTask (){
      var taskName = this.get('taskName');

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

        window.swal("Good job!", "You created a task!", "success");
      } else {
        window.swal("No Go!", "Field is empty!", "error");
      }
    }
  }
});
