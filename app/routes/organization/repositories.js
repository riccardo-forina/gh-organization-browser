import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    const {org_name: orgName} = params;
    this.set('organization', orgName);
    return this.get('store').findRecord('github-organization', orgName);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('organization', this.get('organization'));
  },

  actions: {
    error() {
      this.replaceWith('organization.index', {
        queryParams: {
          organization: this.get('organization'),
          error: true
        }}
      );
    }
  }
});
