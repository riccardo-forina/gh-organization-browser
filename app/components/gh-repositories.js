import Component from '@ember/component';

const NO_LANG = 'unknown';

export default Component.extend({
  init() {
    this._super(...arguments);
    this.languageChoices = [{
      name: 'All languages',
      value: '',
      selected: !this.get('language')
    }]
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.computeLanguages();
    this.filterRepositories();
  },

  computeLanguages() {
    const language = this.get('language');
    this.get('repositories').then(repositories => {
      const languages = Array.from(
        new Set(repositories
          .map((repo) => {
            return repo.get('language') || NO_LANG;
          })
        )
      );
      const languageChoices = [{
          name: 'All languages',
          value: '',
          selected: !language
        },
        ...languages.map(l => ({
          name: l,
          value: l,
          selected: l === language
        }))
      ];
      this.set("languageChoices", languageChoices);
    });
  },

  filterRepositories() {
    const language = this.get('language');
    const languageFilter = language === NO_LANG ? null : language;
    const showPublic = this.get('showPublic');
    const showPrivate = this.get('showPrivate');
    this.get('repositories').then(repositories => {
      let filteredRepositories = repositories;
      if (language) {
        filteredRepositories = filteredRepositories.filter(r =>
          r.get('language') === languageFilter
        );
      }
      if (!showPrivate) {
        filteredRepositories = filteredRepositories.filter(r =>
          r.get('private') === false
        )
      }
      if (!showPublic) {
        filteredRepositories = filteredRepositories.filter(r =>
          r.get('private') === true
        )
      }
      this.set('filteredRepositories', filteredRepositories);
    });
  },

  actions: {
    onChangeLanguage(language) {
      this.get('onChangeLanguage')(language);
    },
    onTogglePublic() {
      this.get('onChangePublic')();
    },
    onTogglePrivate() {
      this.get('onChangePrivate')();
    }
  }
});
