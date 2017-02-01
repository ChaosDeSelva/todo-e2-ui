import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    i18n: Ember.inject.service(),

    commentMessage: '',

    actions: {
        myOnChangedAction (value) {
            this.set('commentMessage', value);
        },
        createComment (){
            const i18n = this.get('i18n');
            const confirmTitle = i18n.t('comment.create.confirm.title').string;
            const confirmText = i18n.t('comment.create.confirm.message').string;
            const confirmButton = i18n.t('comment.create.confirm.button').string;
            const confirmGoodTitle = i18n.t('comment.create.confirm.good.title').string;
            const confirmGoodText = i18n.t('comment.create.confirm.good.text').string;
            const confirmBadTitle = i18n.t('comment.create.confirm.bad.title').string;
            const confirmBadText = i18n.t('comment.create.confirm.bad.text').string;

            window.swal({
                    title: confirmTitle,
                    text: confirmText,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: confirmButton,
                    closeOnConfirm: false,
                    timer: 2000
                },
                function () {
                    var commentMessage = this.get('commentMessage');

                    if (commentMessage.length > 0) {

                        let task = this.get('store').peekRecord('task', this.get('model'));
                        task.set('id', this.get('model'));

                        let comment = this.get('store').createRecord('comment', {
                            message: commentMessage,
                            createdDate: new Date().getTime(),
                            username: this.get('session').get('username'),
                            cid: 0,
                            task: task
                        });
                        comment.save();

                        this.set('commentMessage', '');
                        window.swal(confirmGoodTitle, confirmGoodText, "success");

                    } else {
                        window.swal(confirmBadTitle, confirmBadText, "error");
                    }
                }.bind(this));
        }
    }
});
