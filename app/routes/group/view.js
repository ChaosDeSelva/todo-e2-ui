import Ember from 'ember';

export default Ember.Route.extend({
    model: function(param) {
        var record = this.get('store').peekRecord('group', param.group_id);
        this.controllerFor("group.view").set('groupName', record.get('name'));
        this.get('store').unloadAll('groupTask');
        return this.get('store').query('groupTask', {'id':param.group_id});
    }
});
