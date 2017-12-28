import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gh-organization', 'Integration | Component | gh organization', {
  integration: true
});

test('it renders', function(assert) {
  this.set('avatarUrl', 'avatarUrl');
  this.set('name', 'name');
  this.set('login', 'login');
  this.render(hbs`{{gh-organization
    avatarUrl=avatarUrl
    name=name
    login=login
  }}`);

  assert.equal(this.$('img').attr('src'), 'avatarUrl');
  assert.equal(this.$('h4').text().trim(''), 'name');
  assert.equal(this.$('h6').text().trim(''), 'login');
});
