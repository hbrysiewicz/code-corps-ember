import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  _attributeIsPreviewOnly(attribute) {
    return ['preview', 'markdownPreview'].indexOf(attribute.name) > -1;
  },

  serializeAttribute: function(snapshot, json, key, attribute) {
    // for creating records, just regularly serialize the payload
    if (snapshot.record.get('isNew')) {
      if (snapshot.attr('preview')) {
        if (this._attributeIsPreviewOnly(attribute)) {
          this._super(snapshot, json, key, attribute);
        }
      } else {
        this._super(snapshot, json, key, attribute);
      }
    } else {
      // for updating existing records, we have 2 cases
      // 1. we're editing the title. In that case, we only push the title
      // 2. we're editing or requesting a preview of the post body. In that
      // case, we only need to push markdownPreview and the preview flag itself

      if (snapshot.changedAttributes().title) {
        if (attribute.name === 'title') {
          this._super(snapshot, json, key, attribute);
        }
      } else {
        if (this._attributeIsPreviewOnly(attribute)) {
          this._super(snapshot, json, key, attribute);
        }
      }
    }
  }
});
