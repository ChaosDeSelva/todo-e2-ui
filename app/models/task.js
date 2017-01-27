import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  completed: DS.attr('boolean'),
  private: DS.attr('boolean')
});