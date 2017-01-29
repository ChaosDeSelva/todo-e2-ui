import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  i18n: Ember.inject.service(),

  lang: "English",

  actions: {
    selectLanguage (id){
      //https://github.com/jamesarosen/ember-i18n/wiki/Doc:-Setting-the-Locale
      if (id === 'en'){
        this.set('lang', 'English');
        this.set('i18n.locale', id);
      } else if (id === 'es'){
        this.set('lang', 'Spanish');
        this.set('i18n.locale', id);
      }
    }
  }
});
