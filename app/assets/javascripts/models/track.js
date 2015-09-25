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
      this.author().set(response.author, {parse: true});
      delete response.author;
    };
    if (response.likes) {
      this.likes().set(response.likes, {parse: true});
      delete response.likes;
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

  likes: function() {
    if (!this._likes) {
      that = this;
      this._likes = new CloudSound.Collections.Likes([], {track: that});
    };
    return this._likes;
  },

})
