import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
  token: null,
  username: null,
  uid: null,
  promise: null,

  authenticate(username,password) {
      return Ember.$.ajax({
        method: 'POST',
        dataType: 'json',
        contentType: "application/json",
        url: config.services.taskUrl+'/login',
        data : JSON.stringify({username: username, password: password})
      }).then((info)=>{
        if(info.token !== null){
          this.set('token', info.token);
          this.set('username', info.username);
          this.set('uid', info.uid);
          sessionStorage .setItem("tasktoken", info.token);
        }
        return info;
      });
  },
  unauthenticate() {
      return Ember.$.ajax({
        method: 'GET',
        url: config.services.taskUrl+'/logout',
        headers: { 'Authorization': 'Basic ' + this.get('token') }
      }).then(()=>{
        this.set('token', null);
        this.set('username', null);
        this.set('uid', null);
        sessionStorage .removeItem("tasktoken");
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
        return info;
      });
  },
  ping (resolve, reject){
    var token = sessionStorage.getItem("tasktoken");
    if(token!==null){
      return Ember.$.ajax({
        method: 'GET',
        url: config.services.taskUrl+'/ping',
        headers: { 'Authorization': 'Basic ' + token }
      }).then((info)=>{
        if(info.token !== null){
          this.set('token', info.token);
          this.set('username', info.username);
          this.set('uid', info.uid);
        }
        var promise = this.get('promise');
        if (promise!==null) {
          resolve(true);
        }
      });
    } else {
      reject();

      this.set('token', null);
      this.set('username', null);
      this.set('uid', null);
    }
  }
});
