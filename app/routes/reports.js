import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  model (){
      //Assume we set it and need to switch it out dyamically based on some condition
      this.store.adapterFor('report').set('host', config.services.reportArchiveUrl);

      return Promise.all([
          this.get('store').findAll('report'),
          Ember.$.ajax({
              method: 'GET',
              url: config.services.reportUrl+'/report'
          }).then((info)=>{
              return info;
          })
      ]).then(function(values){
          for (var i = 0; i < values[1].length; i++){
              var tmp = values[0].get('store').peekRecord('report', values[1][i][0]);

              if (tmp !== null){
                  var num = parseInt(tmp.get('total'));
                  if (num > 0) {
                      values[1][i][1] += num
                  }
              }
          }

          return values[1];
      });
  }
});
