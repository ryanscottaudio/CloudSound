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
    if (response.followers) {
      this.followers().set(response.followers, {parse: true});
      delete response.followers;
    };
    if (response.followees) {
      this.followees().set(response.followees, {parse: true});
      delete response.followees;
    };
    if (response.display_tracks) {
      this.displayTracks().set(response.display_tracks, {parse: true});
      delete response.display_tracks;
    };
    return response;
  },

  tracks: function() {
    if (!this._tracks) {
      this._tracks = new CloudSound.Collections.Tracks([], {user: this});
    };
    return this._tracks;
  },

  followers: function() {
    if (!this._followers) {
      this._followers = new CloudSound.Collections.Follows([], {followee: this});
    };
    return this._followers;
  },

  followees: function() {
    if (!this._followees) {
      this._followees = new CloudSound.Collections.Follows([], {follower: this});
    };
    return this._followees;
  },

  displayTracks: function() {
    if (!this._displayTracks) {
      this._displayTracks = new CloudSound.Collections.Tracks([], {user: this});
    };
    return this._displayTracks;
  },
});

CloudSound.Models.CurrentUser = CloudSound.Models.User.extend ({

  url: "api/session",

  initialize: function(options) {
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isSignedIn: function() {
    return !this.isNew();
  },

  signIn: function(options) {
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password]": options.password,
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data) {
        model.set(data);
        options.success && options.success();
      },
      error: function() {
        options.error && options.error();
      },
    });
  },

  signOut: function(options) {
    var model = this;

    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function(data) {
        model.clear();
        options.success && options.success();
        Backbone.history.navigate("_=_", {trigger: true});
      }
    });
  },

  fireSessionEvent: function() {
    if (this.isSignedIn()) {
      this.trigger("signIn");
    } else {
      this.trigger("signOut");
    }
  },
});
