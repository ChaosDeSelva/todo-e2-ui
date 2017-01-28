import Ember from 'ember';

export default Ember.Controller.extend({
  username: '',
  password: '',

  session: Ember.inject.service(),

  actions:{
    login (){

      var un = this.get('username');
      var pw = this.get('password');

      if (un.length > 0 || pw.length > 0){
        this.get('session').authenticate(un, pw).then((info)=>{
          if (info.token !== null){
            this.get('store').unloadAll('task');
            this.transitionToRoute('/');
          } else {
            window.swal('Well...', 'That account was not found!!! Probably your fault!', 'error');
          }
        }, (err)=>{
          console.log(err);
        });
      } else {
        window.swal('Hey Now!', 'All fields are required here!', 'error');
      }
    }
  }
});
