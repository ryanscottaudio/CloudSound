CloudSound.Models.Comment = Backbone.Model.extend({

  urlRoot: function () {
    return "api/tracks/" + this.get('track_id') + "/comments";
  },

  toJSON: function() {
    return {
      comment: _.clone(this.attributes),
    };
  },

  parse: function(response) {
    if (response.author) {
      this.author().set(response.author);
      delete response.author;
    };
    return response;
    if (response.track) {
      this.track().set(response.track);
      delete response.track;
    };
    return response;
  },


  author: function() {
    if (!this._author) {
      this._author = new CloudSound.Models.User();
    };
    return this._author
  },

  track: function() {
    if (!this._track) {
      this._track = new CloudSound.Models.Track();
    };
    return this._track
  },



})
