import Ember from 'ember';

export function cleanString(params) {
    return new Ember.String.htmlSafe('background-color:' + params[0]);
}

export default Ember.Helper.helper(cleanString);
