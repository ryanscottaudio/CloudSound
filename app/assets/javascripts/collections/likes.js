CloudSound.Collections.Likes = Backbone.GofCollection.extend({

  initialize: function(models, options) {
    this.track = options.track;
  },

  url: function () {
    return "api/tracks/" + this.track.get('id') + "/likes";
  },

  model: CloudSound.Models.Like,

})
