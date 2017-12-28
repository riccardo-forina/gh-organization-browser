import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from "ember";

const testRepositories = [
  Ember.Object.create({
    language: 'JavaScript',
    private: true
  }),
  Ember.Object.create({
    language: 'JavaScript',
    private: false
  }),
  Ember.Object.create({
    language: 'Typescript',
    private: false
  }),
  Ember.Object.create({
    language: null,
    private: false
  }),
];

moduleForComponent('gh-repositories', 'Integration | Component | gh repositories', {
  integration: true,

  beforeEach() {
    const promise = new Ember.RSVP.Promise((resolve) =>
      resolve(testRepositories)
    );

    this.set('repositories', promise);
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{gh-repositories
    repositories=repositories
  }}`);

  assert.equal(this.$('[data-repo-length]').text().trim(), testRepositories.length);
});

test('it removes language duplicates in the select', function(assert) {
  this.render(hbs`{{gh-repositories
    repositories=repositories
  }}`);
  assert.equal(this.$('select > option').length, 4);
});

test('it filters by language', function(assert) {
  this.set('language', 'JavaScript')
  this.render(hbs`{{gh-repositories
    repositories=repositories
    language=language
  }}`);

  assert.equal(this.$('[data-repo-length]').text().trim(), 2);
});

test('it hides public repos', function(assert) {
  this.set('showPublic', false)
  this.render(hbs`{{gh-repositories
    repositories=repositories
    showPublic=showPublic
  }}`);

  assert.equal(this.$('[data-repo-length]').text().trim(), 1);
});


test('it hides private repos', function(assert) {
  this.set('showPrivate', false)
  this.render(hbs`{{gh-repositories
    repositories=repositories
    showPrivate=showPrivate
  }}`);

  assert.equal(this.$('[data-repo-length]').text().trim(), 3);
});
