import Ember from 'ember';

export function formatTags(params) {
  return new Ember.String.htmlSafe(params[0]);
}

export default Ember.Helper.helper(formatTags);
