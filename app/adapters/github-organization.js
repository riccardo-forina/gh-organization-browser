import GitHubOrganizationAdapter from 'ember-data-github/adapters/github-organization';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default GitHubOrganizationAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:github'
});
