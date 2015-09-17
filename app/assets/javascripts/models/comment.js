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
    if (response.comments) {
      this.comments().set(response.comments, {parse: true});
      delete response.comments;
    };
    return response;
  },

  comments: function() {
    if (!this._comments) {
      this._comments = new CloudSound.Collections.Comments([], {track: this});
    };
    return this._comments;
  },

})
