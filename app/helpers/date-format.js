import Ember from 'ember';

export function dateFormat(params) {
  return new Date(parseInt(params[0].substring(0, 8), 16) * 1000);
}

export default Ember.Helper.helper(dateFormat);
