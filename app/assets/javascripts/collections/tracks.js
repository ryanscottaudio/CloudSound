CloudSound.Collections.Tracks = Backbone.GofCollection.extend({

  initialize: function(options) {
    this.user = options.user;
  },

  url: "api/tracks",

  model: CloudSound.Models.Track,

})
