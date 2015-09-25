CloudSound.Collections.Tracks = Backbone.GofCollection.extend({

  initialize: function(options) {
    this.user = options.user;
  },

  url: "api/tracks",

  model: CloudSound.Models.Track,

  comparator: function(track1, track2) {
    if (track1.get('created_at') > track2.get('created_at')) {
      return -1;
    } else if (track1.get('created_at') < track2.get('created_at')) {
      return 1;
    } else {
      return 0;
    }
  },

})

CloudSound.Collections.Feed = CloudSound.Collections.Tracks.extend({

  url: "api/feed",

})
