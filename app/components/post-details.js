import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),

  classNames: ['post-details'],

  didInitAttrs() {
    this.set('isEditingBody', false);
    this.set('isEditingTitle', false);
    return this._super(...arguments);
  },

  actions: {
    editPostBody() {
      this.set('isEditingBody', true);
    },

    generatePreview(markdown) {
      let post = this.get('post');
      post.set('markdownPreview', markdown);
      post.set('preview', true);
      post.save();
    },

    savePostBody() {
      let post = this.get('post');
      post.set('preview', false);
      post.save();
    },

    savePostTitle(title) {
      let post = this.get('post');
      post.set('title', title);
      post.save();
    }
  }
});
