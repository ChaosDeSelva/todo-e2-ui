import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),

  commentMessage: '',

  actions:{
    myOnChangedAction (value) {
      this.set('commentMessage', value);
    },
    createComment (){
      window.swal({
          title: "Are you sure?",
          text: "FYI I am to lazy to create functionality for you to delete it!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "DO IT!",
          closeOnConfirm: false,
          timer: 2000
        },
        function(){
          var commentMessage = this.get('commentMessage');

          if (commentMessage.length > 0){

            let task = this.get('store').peekRecord('task', this.get('model'));
            task.set('id', this.get('model'));

            let comment = this.get('store').createRecord('comment', {
              message: commentMessage,
              createdDate: new Date().getTime(),
              username: this.get('session').get('username'),
              cid: 0,
              task: task
            });
            comment.save();

            this.set('commentMessage', '');
            window.swal("Well...", "That is permanent.", "success");

          } else {
            window.swal("No Go!", "Field is empty!", "error");
          }
        }.bind(this));
    }
  }
});
