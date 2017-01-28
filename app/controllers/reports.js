import Ember from 'ember';

export default Ember.Controller.extend({
  options: {
    title: 'Total tasks logged every 24 hours',
    height: 450,

    isStacked: true,
    legend: { position: "none" }
  }
});
