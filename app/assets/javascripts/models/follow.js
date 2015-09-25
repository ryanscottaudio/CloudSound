CloudSound.Models.Follow = Backbone.Model.extend({

  urlRoot: "api/follows",

  toJSON: function() {
    return {
      follow: _.clone(this.attributes),
    };
  },

  parse: function(response) {
    if (response.follower) {
      this.follower().set(response.follower, {parse: true});
      delete response.follower;
    };
    if (response.followee) {
      this.track().set(response.followee, {parse: true});
      delete response.followee;
    };
    return response;
  },

  follower: function() {
    if (!this._follower) {
      this._follower = new CloudSound.Models.User();
    };
    return this._follower
  },

  followee: function() {
    if (!this._followee) {
      this._followee = new CloudSound.Models.User();
    };
    return this._followee
  },

})
