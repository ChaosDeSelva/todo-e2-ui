import Ember from 'ember';

export default Ember.Controller.extend({
  i18n: Ember.inject.service(),

  options: null,
  refresh: true,

  title: Ember.observer('i18n.locale', function() {
    this.set("options.title", this.get('i18n').t('reports.message').string);
    this.set('refresh', false);

    Ember.run.next(() => {
      this.set('refresh', true);
    });
  }),

  init (){
    //http://sir-dunxalot.github.io/ember-google-charts/
    this.set("options", {
      title: this.get('i18n').t('reports.message').string,
        height: 450,
        chartArea: {width: '100%'},
        animation: {
          duration: 500,
          startup: false,
        },
        series: {
          0:{color:'#4285F4'},
          1:{color:'#89A5D5'}
        },
        isStacked: true,
        bar: { groupWidth: '75%' },
        legend: { position: "none" },
        is3D: false
    });
  }
});
