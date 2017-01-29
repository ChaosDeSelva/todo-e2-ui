import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),

    beforeModel() {
      if (this.get('session.token') !== null) {
        this.transitionTo('/');
      }
    },

    deactivate () {
      this.get('controller').set('username','');
      this.get('controller').set('password','');
    }
});
