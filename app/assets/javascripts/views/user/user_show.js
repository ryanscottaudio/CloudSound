CloudSound.Views.UserShow = Backbone.CompositeView.extend({

  tagName: 'div',
  className: 'user',

  template: JST['users/show'],

  events: {
    "click button.follow-button": "followUnfollow",
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    this.eachSubview(function (subview) {subview.remove()});
    this.$el.html(this.template({user: this.model}));
    this.setFollowed();
    this.addTracksIndex();
    addHeader.call(this);
    return this;
  },

  addTracksIndex: function () {
    that = this;
    var tracksIndexView = new CloudSound.Views.TrackIndex({
      collection: that.model.tracks(),
    });
    this.addSubview('div.tracks-index', tracksIndexView);
  },

  setFollowed: function() {
    this.followAttrs = {
      followee_id: this.model.id,
      follower_id: CloudSound.currentUser.id,
    };
    this.follow = this.model.followers().where(this.followAttrs)[0];
    if (typeof this.follow !== 'undefined') {
      this.$('button.follow-button').toggleClass('followed');
    }
  },

  followUnfollow: function(e) {
    e.preventDefault();
    if(typeof this.follow === 'undefined') {
      var follow = new CloudSound.Models.Follow(this.followAttrs);
      follow.save({}, {
        success: function() {
          this.follow = follow;
          this.model.followers().add(follow);
          this.$('button.follow-button').toggleClass('followed');
          this.$('li.follows').html('Followers: ' + this.model.followers().length);
          CloudSound.currentUser.fetch();
        }.bind(this),
      });
    } else {
      this.follow.destroy({
        success: function() {
          this.follow = undefined;
          this.$('button.follow-button').toggleClass('followed');
          this.$('li.follows').html('Followers: ' + this.model.followers().length)
          CloudSound.currentUser.fetch();
        }.bind(this),
      });
    }
  },

})
