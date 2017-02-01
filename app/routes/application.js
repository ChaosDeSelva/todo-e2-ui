import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),

    beforeModel (){
        var promise = new Ember.RSVP.Promise(function (resolve, reject) {
            this.get('session').ping(resolve, reject);
        }.bind(this));

        this.get('session').set('promise', promise);
    },

    actions: {
        error: function (error) {
            console.log(error);
            if (error.status === 0) {
                window.swal('Hmm... Not Good.', 'Internet Issues?', 'error');
            } else if (error.status === 403) {
                window.swal('Hmm... Not Good.', 'Do something else because this is not working!', 'error');
            } else if (error.status === 401) {
                window.swal('Hmm... Not Good.', 'Do something else because this is not working!', 'error');
            } else if (error.status === 404) {
                this.transitionTo('not-found');
            } else {
                window.swal('Hmm... Not Good.', 'Do something else because this is not working!', 'error');
            }
        }
    }
});
