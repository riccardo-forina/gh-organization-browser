import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams: ['showPrivate', 'showPublic', 'language'],
  showPrivate: true,
  showPublic: true,
  language: null,

  filteredRepositories: computed('showPublic', 'showPrivate', 'language', 'model', function() {
    let showPublic = this.get('showPublic');
    let showPrivate = this.get('showPrivate');
    let language = this.get('language');
    let organization = this.get('model');

    // if (category) {
    //   return articles.filterBy('category', category);
    // } else {
    //   return articles;
    // }
    return organization.get('githubRepositories');
  }),

});
