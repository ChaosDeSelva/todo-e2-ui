import DS from 'ember-data';

export default DS.Model.extend({
    code: DS.attr('string'),
    color: DS.attr('string'),
    name: DS.attr('string'),
    uid: DS.attr('string'),
    private: DS.attr('boolean')
});
