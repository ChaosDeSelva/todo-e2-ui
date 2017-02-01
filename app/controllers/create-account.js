import Ember from 'ember';

export default Ember.Controller.extend({
  i18n: Ember.inject.service(),
  session: Ember.inject.service(),

  username: '',
  password: '',
  confirmpassword: '',

  actions:{
    createAccount (){

      var un = this.get('username');
      var pw = this.get('password');
      var cpw = this.get('confirmpassword');
      const i18n = this.get('i18n');
      const badTitle = i18n.t('create.account.bad.title').string;
      const badText = i18n.t('create.account.bad.text').string;
      const goodTitle = i18n.t('create.account.good.title').string;
      const goodText = i18n.t('create.account.good.text').string;
      const matchTitle = i18n.t('create.account.error.match.title').string;
      const matchText = i18n.t('create.account.error.match.text').string;
      const requiredTitle = i18n.t('create.account.error.required.title').string;
      const requiredText = i18n.t('create.account.error.required.text').string;

      if (un.length > 0 || pw.length > 0 || cpw.length > 0){
        if (pw === cpw){
          this.get('session').createUser(un, pw, cpw).then((data)=>{
            if (data.err){
              window.swal(badTitle, badText, 'error');
            } else {
              window.swal(goodTitle, goodText, 'success');
              this.transitionToRoute('/login');
            }
          }, (err)=>{
            console.log(err);
          });
        } else {
          window.swal(matchTitle, matchText, 'error');
        }
      } else {
        window.swal(requiredTitle, requiredText, 'error');
      }
    }
  }
});
