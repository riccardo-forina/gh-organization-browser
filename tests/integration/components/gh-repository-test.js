import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from "ember";

const testRepository = Ember.Object.create({
  name: 'Baz',
  description: 'Baz desc',
  url: 'http://baz',
  branches: ['master', 'dev', 'gh-pages'],
  language: 'Typescript',
  private: false
});

moduleForComponent('gh-repository', 'Integration | Component | gh repository', {
  integration: true,

  beforeEach() {
    this.set('name', testRepository.name);
    this.set('description', testRepository.description);
    this.set('url', testRepository.url);
    this.set('branches', testRepository.branches);
    this.set('language', testRepository.language);
    this.set('private', testRepository.private);
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{gh-repository
    name=name
    description=description
    url=url
    branches=branches
    language=language
    private=private
  }}`);

  assert.equal(this.$().text().trim(), testRepository.name);
});

test('it expands', function(assert) {
  this.render(hbs`{{gh-repository
    name=name
    description=description
    url=url
    branches=branches
    language=language
    private=private
  }}`);

  this.$('.card-header').click();
  assert.equal(this.$('.title').text().trim(), testRepository.name);
});

test('it shows branch length', function(assert) {
  this.render(hbs`{{gh-repository
    name=name
    description=description
    url=url
    branches=branches
    language=language
    private=private
  }}`);

  this.$('.card-header').click();
  assert.equal(this.$('[data-branch-length]').text().trim(), 3);
});
