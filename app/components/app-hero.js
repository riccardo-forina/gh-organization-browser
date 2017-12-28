import Component from '@ember/component';
import Ember from "ember";

export default Component.extend({

  organization: "",
  fullHeight: false,
  isLoading: false,

  user: Ember.inject.service(),
  session: Ember.inject.service(),

  didReceiveAttrs() {
    this._super(...arguments);
    const currentUser = this.get('user').get('currentUser');
    this.set('currentUser', currentUser);
  },

  actions: {
    logout() {
      this.get('session').invalidate();
    },

    searchOrganization() {
      const organization = this.get('organization');
      if (organization && organization.length >= 3) {
        this.get('onSearch')(organization);
      }
    }
  }
});
