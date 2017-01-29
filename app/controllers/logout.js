import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  i18n: Ember.inject.service(),

  actions:{
    logout (){
      this.get('session').unauthenticate().then(()=>{
        this.get('store').unloadAll('task');
        this.transitionToRoute('/');
      }, (err)=>{
        console.log(err);
      });
    }
  }
});
