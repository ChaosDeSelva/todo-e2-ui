import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    i18n: Ember.inject.service(),

    color: '#fa004b',
    groupName: '',
    groupCode: '',
    privateStatus: false,

    actions:{
        uppercaseCode(){
            this.set('groupCode', this.get('groupCode').toUpperCase());
        },
        createGroup (){
            var groupName = this.get('groupName');
            var groupCode = this.get('groupCode');
            var groupColor = this.get('color');
            const i18n = this.get('i18n');

            if (groupName.length > 0 && groupCode.length > 0 && groupColor.length > 0){
                var group = this.get('store').createRecord('group', {
                    name: groupName,
                    code: groupCode,
                    color: groupColor,
                    uid: this.get('session').uid,
                    private: this.get('privateStatus')
                });

                group.save();
                this.set('color', '#fa004b');
                this.set('groupName', '');
                this.set('groupCode', '');
                this.set('privateStatus', false);

                const successTitle = i18n.t('create.group.success.title').string;
                const successMsg = i18n.t('create.group.success.message').string;

                window.swal(successTitle, successMsg, "success");
            } else {
                const errTitle = i18n.t('create.group.required.title').string;
                const errMsg = i18n.t('create.group.required.message').string;

                window.swal(errTitle, errMsg, "error");
            }
        }
    }
});
