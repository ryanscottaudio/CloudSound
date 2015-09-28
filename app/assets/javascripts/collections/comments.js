CloudSound.Collections.Comments = Backbone.GofCollection.extend({

  initialize: function(models, options) {
    this.track = options.track;
  },

  url: function () {
    return "api/tracks/" + this.track.get('id') + "/comments";
  },

  comparator: function(track1, track2) {
    if (track1.get('created_at') > track2.get('created_at')) {
      return -1;
    } else if (track1.get('created_at') < track2.get('created_at')) {
      return 1;
    } else {
      return 0;
    }
  },

  model: CloudSound.Models.Comment,

})
