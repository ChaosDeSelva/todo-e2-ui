import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    searchTasks(){
     var model = this.get('model');
     var searchQuery = this.get("value");

     if(searchQuery){
       this.set('model', model);
     } else {
       this.set('model', model);
     }
    }
  }
});
