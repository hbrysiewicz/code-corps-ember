import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),

  body: DS.attr('string'),
  bodyPreview: DS.attr('string'),

  markdown: DS.attr('string'),
  markdownPreview: DS.attr('string'),

  preview: DS.attr('boolean'),

  state: DS.attr('string'),
  postType: DS.attr('string'),
  likesCount: DS.attr('number'),
  number: DS.attr('number'),
  createdAt: DS.attr('date'),

  project: DS.belongsTo('project'),
  user: DS.belongsTo('user', { async: true }),
  comments: DS.hasMany('comment'),
});
