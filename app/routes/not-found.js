import Ember from 'ember';

//messing around with swapping css between pages
//http://stackoverflow.com/questions/31401400/how-to-change-body-background-for-different-pages-in-ember

export default Ember.Route.extend({
  activate () {
    Ember.$('body').addClass('bg-black');
  },

  deactivate () {
    Ember.$('body').removeClass('bg-black');
  }
});
