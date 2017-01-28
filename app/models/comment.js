import DS from 'ember-data';

export default DS.Model.extend({
  task: DS.belongsTo('task'),
  cid: DS.attr('string'),
  username: DS.attr('string'),
  message: DS.attr('string'),
  createdDate: DS.attr('number'),

  created: Ember.computed('createdDate', function() {
    return new Date(parseInt(this.get('createdDate')));
  })
});
