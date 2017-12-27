import GitHubRepositoryAdapter from 'ember-data-github/adapters/github-repository';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default GitHubRepositoryAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:github'
});
