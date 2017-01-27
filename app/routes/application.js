import Ember from 'ember';

export default Ember.Route.extend({
      actions: {
        error: function(error, transition){
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
