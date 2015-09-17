CloudSound.Models.User = Backbone.CFModel.extend({

  urlRoot: "api/users",

  toJSON: function() {
    return {
      user: _.clone(this.attributes),
    };
  },

  parse: function(response) {
    if (response.tracks) {
      this.tracks().set(response.tracks, {parse: true});
      delete response.tracks;
    };
    return response;
  },

  tracks: function() {
    if (!this._tracks) {
      this._tracks = new CloudSound.Collections.tracks([], {user: this});
    };
    return this._tracks;
  },
})
