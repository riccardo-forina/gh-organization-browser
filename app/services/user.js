import Ember from 'ember';
import Service from '@ember/service';

export default Service.extend({

  store: Ember.inject.service(),
  session: Ember.inject.service(),

  currentUser: null,

  loadCurrentUser() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.get('store')
        .findRecord('github-user', '#')
        .then(user => {
          this.set('currentUser', user);
          resolve();
        })
        .catch(reject);
    });
  }
});
