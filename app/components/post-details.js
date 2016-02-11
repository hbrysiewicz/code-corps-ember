import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['post-details'],

  didInitAttrs() {
    this.set('isEditingBody', false);
    this.set('isEditingTitle', false);
    return this._super(...arguments);
  },

  actions: {
    editPost() {
      this.set('isEditingBody', true);
    },

    generatePreview(markdown) {
      let post = this.get('post');
      post.set('markdownPreview', markdown);
      post.set('preview', true);
      post.save();
    },

    save() {
      let post = this.get('post');
      post.set('preview', false);
      post.save();
    }
  }
});
