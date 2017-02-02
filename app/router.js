import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('task', { path:'/task/:task_id'});
  this.route('notFound', { path: '/*path' });
  this.route('about');
  this.route('login');
  this.route('logout');
  this.route('createAccount', { path: '/create' });
  this.route('forgotPassword');
  this.route('reports');
  this.route('group', function() {
      this.route('view', { path:'/view/:group_id'});
  });
  this.route('user');
});

export default Router;
