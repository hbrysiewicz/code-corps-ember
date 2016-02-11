import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let projectId = this.modelFor('project').id;
    let queryParams = {
      projectId: projectId,
      number: params.number
    };
    return this.store.queryRecord('post', queryParams);
  },

  setupController(controller, model) {
    controller.set('post', model);
  },

  actions: {
    generatePreview(markdown) {
      let post = this.modelFor('project.posts.edit');
      post.set('markdownPreview', markdown);
      post.set('preview', true);
      post.save();
    },

    save() {
      let post = this.modelFor('project.posts.edit');
      post.set('preview', false);
      post.save().then((post) => {
        this.transitionTo('project.posts.post', post.get('number'));
      });
    }
  }
});
