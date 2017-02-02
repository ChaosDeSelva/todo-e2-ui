import DS from 'ember-data';
import { Model } from 'ember-cli-mirage';

export default Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),
  admin: DS.attr('boolean')
});
