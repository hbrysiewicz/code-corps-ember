import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    pageNumber: { as: 'page', refreshModel: true, scope: 'controller' },
    postType: { as: 'type', refreshModel: true }
  },

  session: Ember.inject.service(),

  model(params) {
    let project = this.modelFor('project');
    let fullParams = Ember.merge(params, {
      projectId: project.get('id')
    });
    return this.get('store').query('post', fullParams);
  },

  setupController(controller, model) {
    controller.set('posts', model);
  },

  actions: {
    updateQueryParams(filters) {
      let controller = this.controllerFor('project.posts.index');
      controller.setProperties(filters);
    },
  }
});
