import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        goto (id){
            this.transitionToRoute('task', id);
        }
    }
});
