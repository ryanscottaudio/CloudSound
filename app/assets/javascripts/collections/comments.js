CloudSound.Collections.Comments = Backbone.GofCollection.extend({

  initialize: function(options) {
    this.track = options.track;
  },

  url: "api/tracks/:track_id/comments",

  model: CloudSound.Models.Comment,

})
