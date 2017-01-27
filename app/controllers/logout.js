import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions:{
    logout (){
      this.get('session').unauthenticate().then(()=>{
        this.transitionToRoute('/');
      }, (err)=>{
        console.log(err);
      });
    }
  }
});
