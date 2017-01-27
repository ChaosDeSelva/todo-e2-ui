import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
  token: null,
  username: null,
  uid: null,

  authenticate(username,password) {
      return Ember.$.ajax({
        method: 'POST',
        dataType: 'json',
        contentType: "application/json",
        url: config.services.taskUrl+'/login',
        data : JSON.stringify({username: username, password: password})
      }).then((info)=>{
        console.log(info);
        if(info.token !== null){
          this.set('token', info.token);
          this.set('username', info.username);
          this.set('uid', info.uid);
        }
        return info;
      });
  },
  unauthenticate() {
      return Ember.$.ajax({
        method: 'GET',
        url: config.services.taskUrl+'/logout',
        headers: { 'Authorization': 'Basic ' + this.get('token') }
      }).then((info)=>{
        console.log(info);
        this.set('token', null);
      });
  },
  isLogged: Ember.computed('token', function(){
    return this.get('token') !== null;
  }),
  createUser (username, password, confirmPassword) {
      return Ember.$.ajax({
        method: 'POST',
        dataType: 'json',
        contentType: "application/json",
        url: config.services.taskUrl+'/create',
        data : JSON.stringify({username: username, password: password, confirmPassword: confirmPassword})
      }).then((info)=>{
        console.log(info);
        return info;
      });
  }
});
