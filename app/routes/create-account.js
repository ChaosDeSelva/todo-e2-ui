import Ember from 'ember';

export default Ember.Route.extend({
  templateName: 'createAccount',

  deactivate () {
    this.get('controller').set('username','');
    this.get('controller').set('password','');
    this.get('controller').set('confirmpassword','');
  }
});
