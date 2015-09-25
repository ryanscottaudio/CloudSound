CloudSound.Collections.Follows = Backbone.GofCollection.extend({

  initialize: function(models, options) {
    this.follower = options.follower;
    this.followee = options.followee;
  },

  url: "api/follows",

  model: CloudSound.Models.Follow,

})
