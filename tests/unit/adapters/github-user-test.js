import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:github-user', 'Unit | Adapter | github user', {
  // Specify the other units that are required for this test.
  needs: ['service:session']
});

test('it uses the github authorizer', function(assert) {
  let adapter = this.subject();
  assert.equal(adapter.authorizer, 'authorizer:github');
});
