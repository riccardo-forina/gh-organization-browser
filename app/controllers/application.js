import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  config: config.torii.providers['github-oauth2']
});
