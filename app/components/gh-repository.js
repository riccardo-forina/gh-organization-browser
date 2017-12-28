import Component from '@ember/component';

export default Component.extend({
  classNames: ['card'],
  expanded: false,
  actions: {
    toggleExpand() {
      this.toggleProperty('expanded');
    }
  }
});
