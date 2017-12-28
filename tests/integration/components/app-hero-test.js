import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const testUser = {
  htmlUrl: 'http://foo.bar',
  avatarUrl: 'http://foo.baz',
  name: 'FooBar'
};

const userStub = Ember.Service.extend({
  currentUser: testUser
});

const sessionStub = Ember.Service.extend({
});

moduleForComponent('app-hero', 'Integration | Component | app hero', {
  integration: true,

  beforeEach() {
    this.register('service:user', userStub);
    this.register('service:session', sessionStub);
    this.inject.service('user', { as: 'user' });
    this.inject.service('session', { as: 'session' });
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{app-hero}}`);
  assert.equal(this.$('h3').text().trim(''), 'GitHub organization browser');
});

test('it shows the currently logged in user', function(assert) {
  this.render(hbs`{{app-hero}}`);
  assert.equal(
    this.$('.navbar-brand > .navbar-item').attr('href'),
    testUser.htmlUrl
  );
  assert.equal(
    this.$('.navbar-brand > .navbar-item > img').attr('src'),
    testUser.avatarUrl
  );
  assert.equal(
    this.$('.navbar-brand > .navbar-item').text().trim(''),
    testUser.name
  );
});

test('it sets the text input initial value', function(assert) {
  const expected = 'placeholder';

  this.set('organization', expected)
  this.render(hbs`{{app-hero
    organization=organization
  }}`);

  assert.equal(this.$('input').val(), expected);
});

test('it goes full height', function(assert) {
  this.set('fullHeight', true)
  this.render(hbs`{{app-hero
    fullHeight=fullHeight
  }}`);

  assert.ok(this.$('.hero').hasClass('is-fullheight'));
});

test('it doesn\'t calls the onSearch action on form submit without an organization', function(assert) {
  assert.expect(0);

  this.on('onSearch', () => assert.ok(false));
  this.render(hbs`{{app-hero
    onSearch=(action 'onSearch')
  }}`);

  this.$('button').click();
});

test('it calls the onSearch action on form submit', function(assert) {
  assert.expect(1);

  this.set('organization', 'foo');
  this.on('onSearch', () => assert.ok(true));
  this.render(hbs`{{app-hero
    organization=organization
    onSearch=(action 'onSearch')
  }}`);

  this.$('button').click();
});

test('it gives a loading feedback', function(assert) {
  this.set('isLoading', true);
  this.render(hbs`{{app-hero
    isLoading=isLoading
  }}`);

  assert.ok(this.$('button').hasClass('is-loading'));
});

test('it disables form submit on loading', function(assert) {
  assert.expect(0);

  this.set('isLoading', true);
  this.on('onSearch', () => assert.ok(false));
  this.render(hbs`{{app-hero
    isLoading=isLoading
    onSearch=(action 'onSearch')
  }}`);

  this.$('button').click();
});

test('it shows an error message', function(assert) {
  this.set('hasError', true);
  this.set('initialOrganization', 'foo');
  this.render(hbs`{{app-hero
    hasError=hasError
    initialOrganization=initialOrganization
  }}`);
  assert.ok(this.$('.help').text().trim('').includes('foo'));
});

test('it logs out the user', function(assert) {
  assert.expect(1);

  this.set('session.invalidate', () => assert.ok(true));
  this.render(hbs`{{app-hero}}`);

  this.$('[data-login-button]').click();
});
