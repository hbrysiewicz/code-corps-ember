import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  classNames: ['project-post-list'],

  init() {
    this.setProperties({
      pageNumber: 1,
      postType: null
    });

    this._super(...arguments);
  },

  _normalizeMeta(meta) {
    if (Ember.isPresent(meta)) {
      return {
        currentPage: meta.current_page,
        pageSize: meta.page_size,
        totalPages: meta.total_pages,
        totalRecords: meta.total_records
      };
    }
  },

  meta: Ember.computed('posts', function() {
    return this.get('posts.meta');
  }),

  options: Ember.computed('meta', function() {
    return this._normalizeMeta(this.get('meta'));
  }),

  filters: Ember.computed('pageNumber', 'postType', function() {
    let filters = {};
    filters.pageNumber = this.get('pageNumber');

    let postType = this.get('postType');
    if (Ember.isPresent(postType)) {
      filters.postType = postType;
    }

    return filters;
  }),

  actions: {
    removeFilter() {
      this.setProperties({ postType: null, pageNumber: 1 });
    },
    filterBy(postType) {
      this.setProperties({ postType: postType, pageNumber: 1 });
    },

    pageChanged(pageNumber) {
      this.set('pageNumber', pageNumber);
    }
  }
});
