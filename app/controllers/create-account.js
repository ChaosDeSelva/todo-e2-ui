import Ember from 'ember';

export default Ember.Controller.extend({
  username: '',
  password: '',
  confirmpassword: '',

  session: Ember.inject.service(),

  actions:{
    createAccount (){

      var un = this.get('username');
      var pw = this.get('password');
      var cpw = this.get('confirmpassword');

      if (un.length > 0 || pw.length > 0 || cpw.length > 0){
        if (pw === cpw){
          this.get('session').createUser(un, pw, cpw).then((data)=>{
            console.log(data);
            if (data.err){
              window.swal('Hmm... no', 'That username is already taken. Try again!?', 'error');
            } else {
              window.swal("Hey!", "You created an account!", "success");
              this.transitionToRoute('/login');
            }
          }, (err)=>{
            console.log(err);
          });
        } else {
          window.swal('Hey Now!', 'Passwords do not match! Try again!?', 'error');
        }
      } else {
        window.swal('Hey Now!', 'All fields are required here!', 'error');
      }
    }
  }
});
