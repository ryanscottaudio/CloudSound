CloudSound.Models.Track = Backbone.CFModel.extend({

  urlRoot: "api/tracks",

  toJSON: function() {
    return {
      track: _.clone(this.attributes),
    };
  },

  parse: function(response) {
    if (response.comments) {
      this.comments().set(response.comments, {parse: true});
      delete response.comments;
    };
    if (response.author) {
      this.author().set(response.author);
      delete response.author;
    };
    return response;
  },

  comments: function() {
    if (!this._comments) {
      that = this;
      this._comments = new CloudSound.Collections.Comments([], {track: that});
    };
    return this._comments;
  },

  author: function() {
    if (!this._author) {
      this._author = new CloudSound.Models.User();
    };
    return this._author
  },

})
