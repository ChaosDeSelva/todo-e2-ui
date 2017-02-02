import Ember from 'ember';
import shareme from "../utils/shareme";

export default Ember.Component.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    i18n: Ember.inject.service(),

    taskName: '',
    tagName: '',
    description: '',
    privateStatus: false,
    tags: [],
    groups: [],

    init(){
        this._super(...arguments);
        this.set('tagName', '');
        this.set('taskName', '');
        this.set('description', '');
        this.set('privateStatus', false);
        this.set('tags', []);
        this.set('groups', []);
    },

    listOfGroups: Ember.computed('groups.@each', function () {
        var groupsInTask = this.get('groups');
        return shareme(groupsInTask, this.get('store'));
    }),

    actions: {
        deleteTag (val) {
            this.get('tags').removeObject(val);
        },
        deleteGroup (val) {
            this.get('groups').removeObject(val);
        },
        submitTag () {
          const i18n = this.get('i18n');
          var val = this.get('tagName');
          if (val.length > 0) {
            this.get('tags').pushObject(val);
            this.set('tagName', '');
          } else {
            const errTitle = i18n.t('create.tag.no.title').string;
            const errMsg = i18n.t('create.tag.no.message').string;

            window.swal(errTitle, errMsg, "error");
          }
        },
        selectGroup (value) {
            const i18n = this.get('i18n');
            var tmp = this.get('groups');
            if (tmp.indexOf(value) === -1) {
                this.get('groups').pushObject(value);
            } else {
              const errTitle = i18n.t('create.group.no.title').string;
              const errMsg = i18n.t('create.group.no.message').string;

              window.swal(errTitle, errMsg, "warning");
            }
        },
        myOnChangedAction (value) {
            this.set('description', value);
        },
        createTask (){
            var taskName = this.get('taskName');
            const i18n = this.get('i18n');

            if (taskName.length > 0) {
                var task = this.get('store').createRecord('task', {
                    name: taskName,
                    description: this.get('description'),
                    completed: false,
                    private: this.get('privateStatus'),
                    uid: this.get('session').uid,
                    groups: this.get('groups'),
                    tags: this.get('tags')
                });

                task.save();
                this.set('tagName', '');
                this.set('taskName', '');
                this.set('description', '');
                this.set('privateStatus', false);
                this.set('tags', []);
                this.set('groups', []);

                const successTitle = i18n.t('create.task.success.title').string;
                const successMsg = i18n.t('create.task.success.message').string;

                window.swal(successTitle, successMsg, "success");
            } else {
                const errTitle = i18n.t('create.task.required.title').string;
                const errMsg = i18n.t('create.task.required.message').string;

                window.swal(errTitle, errMsg, "error");
            }
        }
    }
});
