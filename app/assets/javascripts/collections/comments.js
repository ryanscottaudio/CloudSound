CloudSound.Collections.Comments = Backbone.GofCollection.extend({

  initialize: function(models, options) {
    this.track = options.track;
  },

  url: function () {
    return "api/tracks/" + this.track.get('id') + "/comments";
  },

  model: CloudSound.Models.Comment,

})
