import { computed } from '@ember/object';
import OrganizationController from './index';

export default OrganizationController.extend({
  queryParams: ['showPrivate', 'showPublic', 'language'],
  showPrivate: true,
  showPublic: true,
  language: null,

  filteredRepositories: computed('showPublic', 'showPrivate', 'language', 'model', function() {
    let showPublic = this.get('showPublic');
    let showPrivate = this.get('showPrivate');
    let language = this.get('language');
    let organization = this.get('model');

    let allRepos = organization.get('githubRepositories');
    let repos = [...allRepos];
    if (language) {
      repos = repos.filter(r => r.language === language);
    }
    if (showPublic) {
      repos = repos.filter(r => r.private === false);
    }
    if (showPrivate) {
      repos = repos.filter(r => r.private === true);
    }
    return repos;
  }),

  actions: {
    setLanguage(language) {
      this.set('language', language);
    },
    togglePublic() {
      this.toggleProperty('showPublic');
    },
    togglePrivate() {
      this.toggleProperty('showPrivate');
    }
  }
});
