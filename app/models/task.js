import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  completed: DS.attr('boolean'),
  uid: DS.attr('string'),
  private: DS.attr('boolean'),
  comments: DS.hasMany('comment'),
  tags: DS.attr('array'),
  groups: DS.attr('array')
});
