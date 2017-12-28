import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  user: Ember.inject.service(),

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      return this.get('user').loadCurrentUser();
    }
  }
});
