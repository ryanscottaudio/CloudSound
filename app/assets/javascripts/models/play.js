CloudSound.Models.Play = Backbone.Model.extend({

  urlRoot: function () {
    return "api/tracks/" + this.get('track_id') + "/plays";
  },

  toJSON: function() {
    return {
      play: _.clone(this.attributes),
    };
  },

  parse: function(response) {
    if (response.player) {
      this.player().set(response.player);
      delete response.player;
    };
    if (response.track) {
      this.track().set(response.track);
      delete response.track;
    };
    return response;
  },

  author: function() {
    if (!this._player) {
      this._player = new CloudSound.Models.User();
    };
    return this._player
  },

  track: function() {
    if (!this._track) {
      this._track = new CloudSound.Models.Track();
    };
    return this._track
  },



})
