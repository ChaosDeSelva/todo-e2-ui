import Ember from 'ember';
import shareme from "../utils/shareme";

export default Ember.Controller.extend({
    listOfGroups: Ember.computed('model.group', 'model.task.groups', function () {
        var groupsInTask = this.get('model.task.groups');
        return shareme(groupsInTask, this.get('store'));
    })
});
