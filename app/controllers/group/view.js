import Ember from 'ember';

export default Ember.Controller.extend({
    groupName: '',
    hasSelection: Ember.computed('model', function () {
        if (this.get('model.length') > 0) {
            return true;
        }
        return false;
    })
});
