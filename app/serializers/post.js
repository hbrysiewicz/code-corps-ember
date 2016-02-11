import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serializeAttribute: function(snapshot, json, key, attribute) {
    // for creating records, just regularly serialize the payload
    if (snapshot.record.get('isNew')) {
      this._super(snapshot, json, key, attribute);
    } else {
      // for updating existing records, we have 2 cases
      // 1. we're editing the title. In that case, we only push the title
      // 2. we're editing or requesting a preview of the post body. In that
      // case, we only need to push markDownPreview and the preview flag itself

      if (snapshot.changedAttributes().title) {
        if (attribute.name === 'title') {
          this._super(snapshot, json, key, attribute);
        }
      } else {
        if (['preview', 'markdownPreview'].indexOf(attribute.name) > -1) {
          this._super(snapshot, json, key, attribute);
        }
      }
    }
  }
});
