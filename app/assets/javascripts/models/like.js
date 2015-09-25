CloudSound.Models.Like = Backbone.Model.extend({

  urlRoot: function () {
    return "api/tracks/" + this.get('track_id') + "/likes";
  },

  toJSON: function() {
    return {
      like: _.clone(this.attributes),
    };
  },

  parse: function(response) {
    if (response.liker) {
      this.liker().set(response.liker, {parse: true});
      delete response.liker;
    };
    if (response.track) {
      this.track().set(response.track, {parse: true});
      delete response.track;
    };
    return response;
  },

  liker: function() {
    if (!this._liker) {
      this._liker = new CloudSound.Models.User();
    };
    return this._liker
  },

  track: function() {
    if (!this._track) {
      this._track = new CloudSound.Models.Track();
    };
    return this._track
  },



})
