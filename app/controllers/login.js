import Ember from 'ember';

export default Ember.Controller.extend({
  i18n: Ember.inject.service(),
  session: Ember.inject.service(),

  username: '',
  password: '',

  actions:{
    login (){

      var un = this.get('username');
      var pw = this.get('password');
      const i18n = this.get('i18n');
      const goodTitle = i18n.t('login.good.title').string;
      const goodMessage = i18n.t('login.good.message').string;
      const badTitle = i18n.t('login.bad.title').string;
      const badMessage = i18n.t('login.bad.message').string;

      if (un.length > 0 || pw.length > 0){
        this.get('session').authenticate(un, pw).then((info)=>{
          if (info.token !== null){
            this.get('store').unloadAll('task');
            this.transitionToRoute('/');
          } else {
            window.swal(goodTitle, goodMessage, 'error');
          }
        }, (err)=>{
          console.log(err);
        });
      } else {
        window.swal(badTitle, badMessage, 'error');
      }
    }
  }
});
