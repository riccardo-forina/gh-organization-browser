import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: {
    initialOrganization: 'organization',
    hasError: 'error'
  },

  initialOrganization: '',
  organization: '',
  hasError: false,

  actions: {
    searchOrganization(organization) {
      this.transitionToRoute('organization.repositories', organization);
    },
  }
});
